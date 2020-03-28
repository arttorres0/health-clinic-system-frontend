import { formatToNgbDate } from "src/app/shared/utils/FormatDate";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class Paciente {
  _id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dataDeNascimento: NgbDateStruct;
  ativo: boolean;

  constructor(paciente?: any) {
    this._id = paciente?._id;
    this.nome = paciente?.nome;
    this.cpf = paciente?.cpf;
    this.email = paciente?.email;
    this.telefone = paciente?.telefone;
    this.dataDeNascimento = formatToNgbDate(paciente?.dataDeNascimento);
    this.ativo = paciente?.ativo;
  }
}
