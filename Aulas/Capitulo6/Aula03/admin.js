import User from "./User.js";

export default class Admin extends User {
  constructor(nome, email, nascimento, role = 'admin', ativo = true){
   super(nome, email, nascimento, role, ativo)
  }

  nomeAdmin(){
    return `${this.nome}`
  }

  criarCurso(nomeCurso, vagas){
    return `curso de ${nomeCurso} criado com ${vagas}`
  }
}

