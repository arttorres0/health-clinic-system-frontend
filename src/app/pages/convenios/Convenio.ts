export class Convenio {
  _id: string;
  nome: string;
  ativo: boolean;

  constructor(id: string = null, nome: string = null) {
    this._id = id;
    this.nome = nome;
  }
}
