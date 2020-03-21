export class Paciente {
  _id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dataDeNascimento: string;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;

  constructor(id: string = null, nome: string = null) {
    this._id = id;
    this.nome = nome;
  }
}
