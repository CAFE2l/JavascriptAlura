const listaLivros = require('./arrays.js');
const cores = {
    limpa: "\x1b[0m",
    vermelho: "\x1b[31m",
    verde: "\x1b[32m",
    amarelo: "\x1b[33m",
    azul: "\x1b[34m",
    roxo: "\x1b[35m",
    ciano: "\x1b[36m",
    cinza: "\x1b[37m",
    pretoebranco: "\x1b[7;30m"
};

const fundo = {
    branco: "\x1b[40m",
    vermelho: "\x1b[41m",
    cinza_claro: "\x1b[107m"
};

const estilos = {
    reset: "\x1b[0m",
    negrito: "\x1b[1m",
    fraco: "\x1b[2m",
    italico: "\x1b[3m",
    sublinhado: "\x1b[4m",
    inverso: "\x1b[7m",
    invisivel: "\x1b[8m",
    tachado: "\x1b[9m"
};

// Variáveis de apoio
const terreno = "aprendendo o mergeSort";
const separadorSuperior = "===".repeat(5);
const separadorInferior = "===".repeat(12) + "=";

// Lógica de centralização manual (o JS não tem o .center do Python nativo)
const centralizado = terreno.padStart((40 + terreno.length) / 2).padEnd(40);

// Execução do Print
console.log(`${estilos.negrito}${cores.vermelho}${separadorSuperior}${cores.cinza}MergeSort${cores.azul}${separadorSuperior}${cores.limpa}`);
console.log(`${cores.cinza}${estilos.negrito}${centralizado}${cores.limpa}`);
console.log(`${estilos.negrito}${cores.verde}${separadorInferior}${cores.limpa}`);


function mergeSort(array, nivelAninhamento = 0){
  
  // Mostra o nível atual da recursão
  console.log(`${cores.cinza}${estilos.negrito}Nível de aninhamento: ${cores.vermelho}${nivelAninhamento}${cores.limpa}`);
  console.log(array);

  // Caso base: se tiver mais de 1 elemento, divide
  if (array.length > 1){
    const meio = Math.floor(array.length / 2);

    // Divide o array em duas partes (SEM alterar o nível original)
    const parte1 = mergeSort(array.slice(0, meio), nivelAninhamento + 1);
    const parte2 = mergeSort(array.slice(meio), nivelAninhamento + 1);

    // Junta ordenando
    array = ordena(parte1, parte2);
  }

  return array;
}


function ordena(parte1, parte2){
  let posicaoAtualParte1 = 0;
  let posicaoAtualParte2 = 0;
  const resultado = [];
  
  while(posicaoAtualParte1 < parte1.length && posicaoAtualParte2 < parte2.length){
    let produtoAtualParte1 = parte1[posicaoAtualParte1];
    let produtoAtualParte2 = parte2[posicaoAtualParte2];
    
    if (produtoAtualParte1.preco < produtoAtualParte2.preco){
      resultado.push(produtoAtualParte1)
      posicaoAtualParte1++;
    } else{
      resultado.push(produtoAtualParte2)
      posicaoAtualParte2++;
    }

  }
  return resultado.concat(posicaoAtualParte1 < parte1.length ? parte1.slice(posicaoAtualParte1)
  : parte2.slice(posicaoAtualParte2));
  

}

console.log(mergeSort(listaLivros));
