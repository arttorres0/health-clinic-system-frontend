import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { formatToNgbDate } from "src/app/shared/utils/FormatDate";

export class Recepcionista {
  _id: string;
  nome: string;
  login: string;
  senha: string;
  cpf: string;
  email: string;
  telefone: string;
  dataDeNascimento: NgbDateStruct;
  dataDeAdmissao: NgbDateStruct;
  ativo: boolean;

  constructor(recepcionista?: any) {
    this._id = recepcionista?._id;
    this.nome = recepcionista?.nome;
    this.login = recepcionista?.login;
    this.senha = recepcionista?.senha;
    this.cpf = recepcionista?.cpf;
    this.email = recepcionista?.email;
    this.telefone = recepcionista?.telefone;
    this.dataDeNascimento = formatToNgbDate(recepcionista?.dataDeNascimento);
    this.dataDeAdmissao = formatToNgbDate(recepcionista?.dataDeAdmissao);
    this.ativo = recepcionista?.ativo;
  }
}
