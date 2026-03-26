import fs from 'fs';
import chalk from 'chalk';

function extraiLinks(texto) {
  // Regex mais simples e eficaz
  const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  
  if (capturas.length === 0) {
    return [];
  }
  
  // Retorna um array de objetos com texto e link
  const resultados = capturas.map(captura => ({
    texto: captura[1],
    link: captura[2]
  }));
  
  return resultados;
}

function trataErro(erro) {
  console.log(chalk.red('Erro detalhado:'), erro);
  throw new Error(chalk.red(`${erro.code}: não há arquivo no diretório`));
}

async function pegaArquivo(caminhoDoArquivo) {
  try {
    const encoding = 'utf-8';
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
    const links = extraiLinks(texto);
    
    if (links.length === 0) {
      console.log(chalk.yellow(`⚠️ Nenhum link encontrado em ${caminhoDoArquivo}`));
    }
    
    return links;
  } catch (erro) {
    trataErro(erro);
  }
}

export default pegaArquivo;
