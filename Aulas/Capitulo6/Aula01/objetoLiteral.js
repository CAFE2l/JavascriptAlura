const user = {
  nome: "Joao",
  email: "Joao@gmail.com",
  nascimento: "2009/02/01",
  role: "estudante",
  ativo: true,
  exibirInfos: function(){
  console.log(this.nome, this.email);
  }
}
 
const admin = {
  nome: "cleide", 
  email: "queDelicia@gmail.com",
  role: "admin",
  criarCurso(){
    console.log('curso criado!');
  }
}


Object.setPrototypeOf(admin, user)
admin.criarCurso()
admin.exibirInfos()
