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
const terreno = "Calculando novas notas";
const separadorSuperior = "===".repeat(5);
const separadorInferior = "===".repeat(13) + "=";

// Lógica de centralização manual (o JS não tem o .center do Python nativo)
const centralizado = terreno.padStart((40 + terreno.length) / 2).padEnd(40);

// Execução do Print
console.log(`${estilos.negrito}${cores.vermelho}${separadorSuperior}${cores.cinza}NovasNotas${cores.azul}${separadorSuperior}${cores.limpa}`);
console.log(`${cores.cinza}${estilos.negrito}${centralizado}${cores.limpa}`);
console.log(`${estilos.negrito}${cores.verde}${separadorInferior}${cores.limpa}`);

const cliente = {
  nome: "Joao",
  idade: 23,
  email: "Joao@gmail.com",
  telefone:["1155555550","1144444440"],
};

cliente.enderecos = [
  {
    rua: "R. Joseph Climber",
    numero: 103,
    apartamento: true,
    complemento: "Ap 934",
  }
];

for (let chave in cliente){
  let tipo = typeof cliente[chave];
  if (tipo !== 'object' && tipo !== 'function'){
  console.log(`${cores.cinza}${estilos.negrito}A chave ${cores.ciano}${chave}${cores.cinza} tem o valor de ${cores.verde}${cliente[chave]}`);
  }
}
