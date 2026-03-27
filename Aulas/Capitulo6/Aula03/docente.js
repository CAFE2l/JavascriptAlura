import User from "./User.js";

class Docente extends User {
   constructor(nome, email, nascimento, role = 'docente', ativo = true){
   super(nome, email, nascimento, role, ativo)
  }
  
  aprovaEstudante(estudante, curso){
    return `estudante ${estudante} passou no curso ${curso}`;
  }
}


const novoDocente = new Docente('cleide', 'queDelica@gmail.com', '2001-01-01');
console.log(novoDocente);
console.log(novoDocente.exibirInfos())
console.log(novoDocente.aprovaEstudante('carlinhos', 'relções sexuais'));
