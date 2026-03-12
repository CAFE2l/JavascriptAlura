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
const terreno = "Calculando notas";
const separadorSuperior = "===".repeat(5);
const separadorInferior = "===".repeat(13);

// Lógica de centralização manual (o JS não tem o .center do Python nativo)
const centralizado = terreno.padStart((40 + terreno.length) / 2).padEnd(40);

// Execução do Print
console.log(`${estilos.negrito}${cores.vermelho}${separadorSuperior}${cores.cinza}NotasSala${cores.azul}${separadorSuperior}${cores.limpa}`);
console.log(`${cores.cinza}${estilos.negrito}${centralizado}${cores.limpa}`);
console.log(`${estilos.negrito}${cores.verde}${separadorInferior}${cores.limpa}`);

const salaJS = [7, 8, 8, 7, 10, 6.5, 4, 10, 7];
const salaJava = [6, 5, 8, 9, 5, 6];
const salaPython = [7, 3.5, 8, 9.5];

function calculaMedia(notasSala){
  const somaNotas = notasSala.reduce((acc, nota) => acc + nota, 0);

  const media = somaNotas / notasSala.length;
  return media
}

console.log(`${cores.cinza}${estilos.negrito}A média da sala de ${cores.amarelo}javascript ${cores.cinza}é de ${cores.amarelo}${estilos.italico}${calculaMedia(salaJS)}`);


console.log(`${cores.cinza}${estilos.negrito}A média da sala de ${cores.verde}java ${cores.cinza}é de ${cores.verde}${estilos.italico}${calculaMedia(salaJava)}`);



console.log(`${cores.cinza}${estilos.negrito}A média da sala de ${cores.ciano}Python${cores.cinza} é de ${cores.ciano}${estilos.italico}${calculaMedia(salaPython)}`);
