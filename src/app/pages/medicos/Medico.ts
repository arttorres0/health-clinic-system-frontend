export class Medico {
  _id: string;
  nome: string;
  login: string;
  senha: string;
  cpf: string;
  email: string;
  telefone: string;
  crm: string;
  dataDeNascimento: string;
  dataDeAdmissão: string;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;

  constructor(id: string = null, nome: string = null) {
    this._id = id;
    this.nome = nome;
  }
}
