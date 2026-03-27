import User from "./User.js";

class Admin extends User {
  constructor(nome, email, nascimento, role = 'admin', ativo = true){
   super(nome, email, nascimento, role, ativo)
  }

  criarCurso(nomeCurso, vagas){
    return `curso de ${nomeCurso} criado com ${vagas}`
  }
}

const novoAdmin = new Admin('RodGrigo', 'r@r.com', '2020-01-01');
// console.log(novoAdmin);
// console.log(novoAdmin.exibirInfos());
console.log(novoAdmin.criarCurso('JS', 20))
