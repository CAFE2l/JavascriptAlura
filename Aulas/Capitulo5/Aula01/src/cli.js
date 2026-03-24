import pegaArquivo from './index.js';
import chalk from 'chalk';

const caminho = process.argv;

async function processaTexto(caminho){
  const resultado = await pegaArquivo(caminho[2]);
  console.log(chalk.blue('lista de Links: '), resultado);
}

processaTexto(caminho);
