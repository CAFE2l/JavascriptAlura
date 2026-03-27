// function User(nome, email){
//   this.nome = nome
//   this.email = email
//
//   this.exibirInfos = function(){
//     return `${this.nome}, ${this.email}`;
//   }
// }
//
// const novoUser = new User('cleide', 'queDelicia@gmail.com');
// console.log(novoUser.exibirInfos());
//
// function Admin(role){
//   User.call(this, 'cleide', 'queDelicia@gmail.com');
//   this.role = role || 'estudante';
// }
//
// Admin.prototype = Object.create(User.prototype);
// const novoUser = new Admin('admin');
// console.log(novoUser.exibirInfos());
// console.log(novoUser.role);
 
const user = {
  init: function(nome, email){
    this.nome = nome 
    this.email = email
  },
  
  exibirInfos: function(){
    return this.nome
  }
}

const novoUser = Object.create(user)
novoUser.init('cleide', 'queDelicia@gmail.com')
console.log(novoUser.exibirInfos());


// console.log(novoUser.exibirInfos('cleide'));
// console.log(user.isPrototypeOf(novoUser));

