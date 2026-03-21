const { livros } = require('./array.js');

// ordenar antes da busca binária
livros.sort((a, b) => a.preco - b.preco);

function busca(array, de, ate, valorBuscado){

  if (de > ate) {
    return "valor nao existe :D";
  }

  const meio = Math.floor((de + ate) / 2);
  const atual = array[meio];

  if (valorBuscado === atual.preco){
    return meio;
  } 
  
  if (valorBuscado < atual.preco){
    return busca(array, de, meio - 1, valorBuscado);
  }

  return busca(array, meio + 1, ate, valorBuscado);
}

const resultado = busca(livros, 0, livros.length - 1, 4);

console.log(resultado);
console.log(livros[resultado]);
