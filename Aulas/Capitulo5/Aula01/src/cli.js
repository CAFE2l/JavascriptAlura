import pegaArquivo from './index.js';
import chalk from 'chalk';
import fs from 'fs';

// Pega o segundo argumento da linha de comando (caminho do arquivo)
const caminho = process.argv[2];

async function processaTexto(caminhoDoArquivo) {
  // Validação: argumento foi fornecido?
  if (!caminhoDoArquivo) {
    console.log(chalk.red('❌ Erro: Você precisa fornecer um caminho!'));
    console.log(chalk.yellow('📌 Exemplo: node cli.js ./meuarquivo.txt'))         
    console.log(chalk.yellow('📌 Exemplo: node cli.js ./pasta'));
    return;
  }

  try {
    // Usa versão assíncrona do lstat
    const stats = await fs.promises.lstat(caminhoDoArquivo);
    
    // Verifica se é um arquivo
    if (stats.isFile()) {
      console.log(chalk.blue(`\n📄 Processando arquivo: ${caminhoDoArquivo}`));
      const resultado = await pegaArquivo(caminhoDoArquivo);
      
      if (resultado && resultado.length > 0) {
        console.log(chalk.yellow('\n📋 Lista de links encontrados:'));
        console.table(resultado); // Exibe em formato de tabela
      } else {
        console.log(chalk.yellow('⚠️ Nenhum link encontrado no arquivo.'));
      }
      
    } 
    // Verifica se é um diretório
    else if (stats.isDirectory()) {
      console.log(chalk.green(`\n📁 Lendo diretório: ${caminhoDoArquivo}`));
      const arquivos = await fs.promises.readdir(caminhoDoArquivo);
      
      console.log(chalk.blue(`\n📋 Arquivos encontrados (${arquivos.length}):`));
      arquivos.forEach((arquivo, index) => {
        console.log(chalk.white(`  ${index + 1}. ${arquivo}`));
      });
      
      // Opcional: Filtrar apenas arquivos .txt ou .md
      const arquivosTexto = arquivos.filter(arq => 
        arq.endsWith('.txt') || arq.endsWith('.md')
      );
      
      if (arquivosTexto.length > 0) {
        console.log(chalk.green(`\n📝 Arquivos de texto encontrados: ${arquivosTexto.join(', ')}`));
      }
      
    } 
    // Outros tipos (link simbólico, socket, etc)
    else {
      console.log(chalk.yellow(`⚠️ "${caminhoDoArquivo}" não é um arquivo nem diretório válido.`));
    }
    
  } catch(erro) {
    // Tratamento específico para arquivo/diretório não encontrado
    if (erro.code === 'ENOENT') {
      console.log(chalk.red(`❌ Erro: O caminho "${caminhoDoArquivo}" não existe!`));
      console.log(chalk.yellow('💡 Verifique se o caminho está correto.'));
    } 
    // Erro de permissão
    else if (erro.code === 'EACCES') {
      console.log(chalk.red(`❌ Erro: Permissão negada para acessar "${caminhoDoArquivo}"!`));
    }
    // Outros erros
    else {
      console.log(chalk.red('❌ Erro inesperado:', erro.message));
    }
  }
}

// Executa a função
processaTexto(caminho);
