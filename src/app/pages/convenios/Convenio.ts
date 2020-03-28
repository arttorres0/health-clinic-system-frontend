export class Convenio {
  _id: string;
  nome: string;
  ativo: boolean;

  constructor(convenio?: any) {
    this._id = convenio?.id;
    this.nome = convenio?.nome;
    this.ativo = convenio?.ativo;
  }
}
