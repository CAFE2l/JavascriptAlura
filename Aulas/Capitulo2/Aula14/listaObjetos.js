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




cliente.enderecos.push({
  rua: "Rua laércio nakashima", 
  numero: 103, 
  apartamento: false,
});

const listaApenasAps = cliente.enderecos.filter(
  (endereco) => endereco.apartamento === true
)


console.log(listaApenasAps);



