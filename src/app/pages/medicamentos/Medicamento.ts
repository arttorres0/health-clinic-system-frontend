export class Medicamento {
  _id: string;
  nomeGenerico: string;
  nomeDeFabrica: string;
  fabricante: string;
  ativo: boolean;

  constructor(medicamento?: any) {
    this._id = medicamento?._id;
    this.nomeGenerico = medicamento?.nomeGenerico;
    this.nomeDeFabrica = medicamento?.nomeDeFabrica;
    this.fabricante = medicamento?.fabricante;
    this.ativo = medicamento?.ativo;
  }
}
