import chalk from 'chalk';
import fs from 'fs';
import pegaArquivo from './index.js';
import listaValidada from './http-validacao.js';

const caminho = process.argv;

async function imprimeLista(valida, resultado, identificador = '') {
  if (!resultado || resultado.length === 0) {
    console.log(chalk.yellow(`⚠️ ${identificador} - Nenhum link encontrado`));
    return;
  }

  if (valida) {
    console.log(chalk.blue(`\n🔄 Validando links de ${identificador || 'arquivo'}...`));
    const listaValidadaResult = await listaValidada(resultado);
    console.log(
      chalk.yellow('\n📋 Lista validada'),
      chalk.black.bgGreen(identificador || 'principal'),
      '\n'
    );
    // Exibe em formato de tabela para melhor visualização
    console.table(listaValidadaResult.map(item => ({
      'Texto': item.texto?.substring(0, 30) || '-',
      'Status': item.status,
      'Mensagem': item.statusTexto
    })));
  } else {
    console.log(
      chalk.yellow('\n📋 Lista de links'),
      chalk.black.bgGreen(identificador || 'principal'),
      '\n'
    );
    console.table(resultado.map(item => ({
      'Texto': item.texto?.substring(0, 30) || '-',
      'Link': item.link?.substring(0, 50) || '-'
    })));
  }
}

async function processaTexto(argumentos) {
  // Melhor: encontra o caminho e verifica flags de forma mais robusta
  const valida = argumentos.includes('--valida');
  const caminhoDoArquivo = argumentos.find(arg => arg && !arg.startsWith('--') && arg !== process.argv[0] && arg !== process.argv[1]);

  // Valida se o caminho foi fornecido
  if (!caminhoDoArquivo) {
    console.log(chalk.red('❌ Erro: Você precisa fornecer um caminho!'));
    console.log(chalk.yellow('\n📌 Uso:'));
    console.log(chalk.white('  node cli.js <caminho> [--valida]'));
    console.log(chalk.gray('\n📌 Exemplos:'));
    console.log(chalk.gray('  node cli.js ./arquivos/texto.md'));
    console.log(chalk.gray('  node cli.js ./arquivos/texto.md --valida'));
    console.log(chalk.gray('  node cli.js ./arquivos/'));
    console.log(chalk.gray('  node cli.js ./arquivos/ --valida'));
    return;
  }

  // Verifica se o caminho existe
  try {
    await fs.promises.access(caminhoDoArquivo);
  } catch (erro) {
    if (erro.code === 'ENOENT') {
      console.log(chalk.red(`❌ Arquivo ou diretório "${caminhoDoArquivo}" não existe`));
    } else {
      console.log(chalk.red(`❌ Erro ao acessar: ${erro.message}`));
    }
    return;
  }

  // Obtém informações do caminho
  const stats = await fs.promises.lstat(caminhoDoArquivo);

  if (stats.isFile()) {
    // Verifica extensão do arquivo
    const extensao = caminhoDoArquivo.split('.').pop().toLowerCase();
    if (!['md', 'txt', 'markdown'].includes(extensao)) {
      console.log(chalk.yellow(`⚠️ Aviso: Arquivo com extensão .${extensao} pode não conter links Markdown`));
    }
    
    console.log(chalk.blue(`\n📄 Processando arquivo: ${caminhoDoArquivo}`));
    const resultado = await pegaArquivo(caminhoDoArquivo);
    
    if (resultado && resultado.length > 0) {
      console.log(chalk.green(`✅ Encontrados ${resultado.length} link(s)`));
    }
    
    await imprimeLista(valida, resultado);
    
  } else if (stats.isDirectory()) {
    console.log(chalk.green(`\n📁 Processando diretório: ${caminhoDoArquivo}`));
    
    try {
      const arquivos = await fs.promises.readdir(caminhoDoArquivo);
      
      // Filtra apenas arquivos .md e .txt
      const arquivosTexto = arquivos.filter(arq => 
        arq.toLowerCase().endsWith('.md') || 
        arq.toLowerCase().endsWith('.txt') ||
        arq.toLowerCase().endsWith('.markdown')
      );
      
      if (arquivosTexto.length === 0) {
        console.log(chalk.yellow('⚠️ Nenhum arquivo .md, .txt ou .markdown encontrado no diretório'));
        return;
      }
      
      console.log(chalk.blue(`📑 Encontrados ${arquivosTexto.length} arquivo(s) para processar:\n`));
      arquivosTexto.forEach((arq, idx) => {
        console.log(chalk.gray(`  ${idx + 1}. ${arq}`));
      });
      
      let totalLinks = 0;
      let arquivosComLinks = 0;
      
      for (const nomeDeArquivo of arquivosTexto) {
        const caminhoCompleto = `${caminhoDoArquivo}/${nomeDeArquivo}`;
        console.log(chalk.blue(`\n📄 Processando: ${nomeDeArquivo}`));
        
        const lista = await pegaArquivo(caminhoCompleto);
        
        if (lista && lista.length > 0) {
          totalLinks += lista.length;
          arquivosComLinks++;
          console.log(chalk.green(`  ✅ ${lista.length} link(s) encontrado(s)`));
        } else {
          console.log(chalk.yellow(`  ⚠️ Nenhum link encontrado`));
        }
        
        await imprimeLista(valida, lista, nomeDeArquivo);
      }
      
      // Resumo final
      if (arquivosTexto.length > 1) {
        console.log(chalk.green.bold(`\n📊 RESUMO:`));
        console.log(chalk.white(`  📁 Arquivos processados: ${arquivosTexto.length}`));
        console.log(chalk.white(`  🔗 Arquivos com links: ${arquivosComLinks}`));
        console.log(chalk.white(`  📋 Total de links: ${totalLinks}`));
      }
      
    } catch (erro) {
      console.log(chalk.red(`❌ Erro ao ler diretório: ${erro.message}`));
    }
  } else {
    console.log(chalk.yellow(`⚠️ "${caminhoDoArquivo}" não é um arquivo nem diretório válido`));
  }
}

// Executa a função com tratamento de erro global
processaTexto(caminho).catch(erro => {
  console.log(chalk.red(`❌ Erro inesperado: ${erro.message}`));
  process.exit(1);
});
