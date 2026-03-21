const { livros } = require('./index.js')

function encontraMenores(pivo, array){
  let menores = 0;
  
  for(let atual = 0; atual < array.length; atual++){
    
    let produtoAtual = array[atual];
    if (produtoAtual.preco < pivo.preco){
      menores++
    }
  }
 trocaLugar(array, array.findIndex(item => item === pivo), menores);
}


function trocaLugar(array,de, para){
  let elem1 = array[de]
  let elem2 = array[para]
  
  array[para] = elem1
  array[de] = elem2
}

function divideNoPivo(array){
  let pivo = array[Math.floor(array.length / 2)];
  console.log(pivo)
  encontraMenores(pivo, array);
  let valoresMenores = 0;

for(let analisando = 0; analisando < array.length; analisando++){
  let atual = array[analisando];
  if(atual.preco <= pivo.preco && atual !== pivo){
    trocaLugar(array, analisando, valoresMenores)
    valoresMenores++;

  }
}

  return array;
}
// console.log(divideNoPivo(livros));
//console.log(encontraMenores(listaLivros[2], listaLivros));

module.exports = trocaLugar;

