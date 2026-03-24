import fs from 'fs';
import chalk from 'chalk';

function trataErro(erro){
  console.error(chalk.red('Detalhes do erro:'), erro);
  throw new Error(chalk.red(`${erro.code}: Não há nenhum arquivo no diretório informado`));
}

async function pegaArquivo(caminhoDoArquivo){
  try{
    const encoding = 'utf-8';
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
    console.log(chalk.green('✓ Arquivo lido com sucesso!'));
    return extraiLinks(texto);
  } catch(erro){
    trataErro(erro);
  }
}

function extraiLinks(texto){
  const regex = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  
  if(capturas.length === 0) {
    console.log(chalk.yellow("⚠️ Nenhum link encontrado no texto"));
    return [];
  }
  
  const resultados = capturas.map(match => ({
    texto: match[1],
    link: match[2]
  }));
  
  console.log(chalk.blue(`🔗 ${resultados.length} link(s) encontrado(s):`));
  return resultados;
}

// Remove ou comenta as chamadas de teste
// extraiLinks(textoTeste);
// pegaArquivo('./package.json');

export default pegaArquivo;
