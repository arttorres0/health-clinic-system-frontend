export class Medicamento {
  _id: string;
  nomeGenerico: string;
  nomeDeFabrica: string;
  fabricante: string;
  ativo: boolean;

  constructor(convenio?: any) {
    this._id = convenio?._id;
    this.nomeGenerico = convenio?.nomeGenerico;
    this.nomeDeFabrica = convenio?.nomeDeFabrica;
    this.fabricante = convenio?.fabricante;
    this.ativo = convenio?.ativo;
  }
}
