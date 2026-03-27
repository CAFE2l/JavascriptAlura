import User from "./User.js";
import Docente from "./docente.js";
import Admin from "./admin.js";

// const novoUser = new User('Cleide', 'queDelicia@gmail.com', '2020-01-01')
// console.log(novoUser.exibirInfos())
//

const novoAdmin = new Admin('rodrigo', 'r@r.com', '2020-1-1')
console.log(novoAdmin.nome)

const novoDocente = new Docente('Guilherme', 'g@g.com', '2000-01-02');
console.log(novoDocente.exibirInfos());
