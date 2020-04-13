import { Paciente } from "../pacientes/Paciente";
import { Medico } from "../medicos/Medico";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { formatToNgbDate } from "src/app/shared/utils/FormatDate";

export class SolicitacaoDeExame {
  _id: string;
  idPaciente: Paciente;
  idMedico: Medico;
  exames: string[];
  nomeArquivoResultado: string;
  data: NgbDateStruct;
  observacao: string;

  constructor(solicitacaoDeExame?: any) {
    this._id = solicitacaoDeExame?._id;
    this.idPaciente = solicitacaoDeExame?.idPaciente
      ? new Paciente(solicitacaoDeExame?.idPaciente)
      : undefined;
    this.idMedico = solicitacaoDeExame?.idMedico
      ? new Medico(solicitacaoDeExame?.idMedico)
      : undefined;
    this.exames = solicitacaoDeExame?.exames;
    this.nomeArquivoResultado = solicitacaoDeExame?.nomeArquivoResultado;
    this.data = formatToNgbDate(solicitacaoDeExame?.data);
    this.observacao = solicitacaoDeExame?.observacao;
  }
}
