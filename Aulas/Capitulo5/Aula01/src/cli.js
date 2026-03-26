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
    const listaValidadaResult = await listaValidada(resultado);
    console.log(
      chalk.yellow('📋 Lista validada'),
      chalk.black.bgGreen(identificador || 'principal'),
      '\n',
      listaValidadaResult
    );
  } else {
    console.log(
      chalk.yellow('📋 Lista de links'),
      chalk.black.bgGreen(identificador || 'principal'),
      '\n',
      resultado
    );
  }
}

async function processaTexto(argumentos) {
  const caminhoDoArquivo = argumentos[2];
  const valida = argumentos[3] === '--valida';

  // Valida se o caminho foi fornecido
  if (!caminhoDoArquivo) {
    console.log(chalk.red('❌ Erro: Você precisa fornecer um caminho!'));
    console.log(chalk.yellow('📌 Uso: node cli.js <caminho> [--valida]'));
    return;
  }

  // Verifica se o caminho existe (versão assíncrona)
  try {
    await fs.promises.access(caminhoDoArquivo);
  } catch (erro) {
    if (erro.code === 'ENOENT') {
      console.log(chalk.red(`❌ Arquivo ou diretório "${caminhoDoArquivo}" não existe`));
      return;
    }
    console.log(chalk.red(`❌ Erro ao acessar: ${erro.message}`));
    return;
  }

  // Obtém informações do caminho
  const stats = await fs.promises.lstat(caminhoDoArquivo);

  if (stats.isFile()) {
    console.log(chalk.blue(`\n📄 Processando arquivo: ${caminhoDoArquivo}`));
    const resultado = await pegaArquivo(caminhoDoArquivo);
    await imprimeLista(valida, resultado);
    
  } else if (stats.isDirectory()) {
    console.log(chalk.green(`\n📁 Processando diretório: ${caminhoDoArquivo}`));
    const arquivos = await fs.promises.readdir(caminhoDoArquivo);
    
    // Filtra apenas arquivos .md e .txt
    const arquivosTexto = arquivos.filter(arq => 
      arq.endsWith('.md') || arq.endsWith('.txt')
    );
    
    if (arquivosTexto.length === 0) {
      console.log(chalk.yellow('⚠️ Nenhum arquivo .md ou .txt encontrado no diretório'));
      return;
    }
    
    for (const nomeDeArquivo of arquivosTexto) {
      const caminhoCompleto = `${caminhoDoArquivo}/${nomeDeArquivo}`;
      console.log(chalk.blue(`\n📄 Processando: ${nomeDeArquivo}`));
      const lista = await pegaArquivo(caminhoCompleto);
      await imprimeLista(valida, lista, nomeDeArquivo);
    }
  }
}

// Executa a função
processaTexto(caminho);
