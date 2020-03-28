import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { formatToNgbDate } from "src/app/shared/utils/FormatDate";

export class Medico {
  _id: string;
  nome: string;
  login: string;
  senha: string;
  cpf: string;
  email: string;
  telefone: string;
  crm: string;
  dataDeNascimento: NgbDateStruct;
  dataDeAdmissao: NgbDateStruct;
  ativo: boolean;

  constructor(medico?: any) {
    this._id = medico?._id;
    this.nome = medico?.nome;
    this.login = medico?.login;
    this.senha = medico?.senha;
    this.cpf = medico?.cpf;
    this.email = medico?.email;
    this.telefone = medico?.telefone;
    this.crm = medico?.crm;
    this.dataDeNascimento = formatToNgbDate(medico?.dataDeNascimento);
    this.dataDeAdmissao = formatToNgbDate(medico?.dataDeAdmissao);
    this.ativo = medico?.ativo;
  }
}
