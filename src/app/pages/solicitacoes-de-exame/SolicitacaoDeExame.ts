import { Paciente } from "../pacientes/Paciente";
import { Medico } from "../medicos/Medico";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { formatToNgbDate } from "src/app/shared/utils/FormatDate";

export class SolicitacaoDeExame {
  _id: string;
  idPaciente: Paciente;
  idMedico: Medico;
  exame: string;
  nomeArquivoResultado: string;
  data: NgbDateStruct;
  observacao: string;

  constructor(solicitacaoDeExame?: any) {
    this._id = solicitacaoDeExame?._id;
    this.idPaciente = new Paciente(solicitacaoDeExame?.idPaciente);
    this.idMedico = new Medico(solicitacaoDeExame?.idMedico);
    this.exame = solicitacaoDeExame?.exame;
    this.nomeArquivoResultado = solicitacaoDeExame?.nomeArquivoResultado;
    this.data = formatToNgbDate(solicitacaoDeExame?.data);
    this.observacao = solicitacaoDeExame?.observacao;
  }
}
