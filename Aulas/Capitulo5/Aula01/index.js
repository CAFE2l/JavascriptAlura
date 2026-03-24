import fs from 'fs';
import chalk from 'chalk';

const textoTeste = "Lorem ipsum (/ˌlɔː.rəm ˈɪp.səm/ LOR-əm IP-səm) is a dummy or placeholder text commonly used in graphic design, publishing, and web development. [Exemplo](https://www.example.com) It is typically a corrupted version of De finibus bonorum et malorum, [Outro link](http://teste.com.br) a 1st-century BC text by the Roman statesman and philosopher Cicero, with words altered, added, and removed to make it nonsensical and improper Latin."

function trataErro(erro){
  console.log(erro)
  throw new Error(chalk.red(erro.code, "Não há nenhum um arquivo no diretorio"));
}

async function pegaArquivo(caminhoDoArquivo){
  try{
   const encoding = 'utf-8';
   const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
   console.log(chalk.green(texto));
   extraiLinks(texto); // Adicionei isso para processar o texto do arquivo
  } catch(erro){
    trataErro(erro);
  }
}

function extraiLinks(texto){
  const regex = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  
  if(capturas.length === 0) {
    console.log(chalk.yellow("Nenhum link encontrado no texto"));
    return;
  }
  
  const resultados = capturas.map(match => ({
    texto: match[1],
    link: match[2]
  }));
  
  console.log(chalk.blue("Links encontrados:"));
  console.log(resultados);
  return resultados;
}

// Teste com o texto
extraiLinks(textoTeste);
