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
const terreno = "Procurando Alunos";
const separadorSuperior = "===".repeat(5);
const separadorInferior = "===".repeat(12) + "=";

// Lógica de centralização manual (o JS não tem o .center do Python nativo)
const centralizado = terreno.padStart((40 + terreno.length) / 2).padEnd(40);

// Execução do Print
console.log(`${estilos.negrito}${cores.vermelho}${separadorSuperior}${cores.cinza}Alunos${cores.azul}${separadorSuperior}${cores.limpa}`);
console.log(`${cores.cinza}${estilos.negrito}${centralizado}${cores.limpa}`);
console.log(`${estilos.negrito}${cores.verde}${separadorInferior}${cores.limpa}`);    verde: "\x1b[42m",
    amarelo: "\x1b[43m",
    azul: "\x1b[44m",
    roxo: "\x1b[45m",
    ciano: "\x1b[46m",
    cinza: "\x1b[47m",
    vermelho_claro: "\x1b[101m",
    verde_claro: "\x1b[102m",
    amarelo_claro: "\x1b[103m",
    azul_claro: "\x1b[104m",
    roxo_claro: "\x1b[105m",
    ciano_claro: "\x1b[106m",
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
const terreno = "Procurando Alunos";
const separadorSuperior = "===".repeat(5);
const separadorInferior = "===".repeat(12) + "=";

// Lógica de centralização manual (o JS não tem o .center do Python nativo)
const centralizado = terreno.padStart((40 + terreno.length) / 2).padEnd(40);

// Execução do Print
console.log(`${estilos.negrito}${cores.vermelho}${separadorSuperior}${cores.cinza}Alunos${cores.azul}${separadorSuperior}${cores.limpa}`);
console.log(`${cores.cinza}${estilos.negrito}${centralizado}${cores.limpa}`);
console.log(`${estilos.negrito}${cores.verde}${separadorInferior}${cores.limpa}`);

const alunos = ["Jão", "Juliana", "Ana", "Caio"];
const medias = [10, 8, 7.5, 9];

const listaDeAlunos = [alunos, medias];


function exibir(aluno){
  if(listaDeAlunos[0].includes(aluno)){
    // const alunos = listaDeAlunos[0];
    // const medias = listaDeAlunos[1];
    
    const [alunos, medias] = listaDeAlunos

    const indice = alunos.indexOf(aluno);
    const mediaAluno = medias[indice];
    console.log(indice);
    console.log(`${cores.cinza}${estilos.negrito}O aluno ${cores.verde}${aluno} ${cores.cinza}esta cadastrado! e está com a nota ${cores.verde}${mediaAluno}${cores.limpa}`);
  }
  else {
    console.log(`${cores.vermelho}${estilos.italico}Aluno não encontrado!${cores.limpa}`);
  }
}

exibir("Fabao");
exibir("Jão");
