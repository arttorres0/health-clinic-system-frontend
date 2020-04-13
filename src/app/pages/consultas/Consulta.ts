import { Paciente } from "../pacientes/Paciente";
import { Medico } from "../medicos/Medico";
import { Convenio } from "../convenios/Convenio";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { formatToNgbDate } from "src/app/shared/utils/FormatDate";

export class Consulta {
  _id: string;
  idPaciente: Paciente;
  idMedico: Medico;
  data: NgbDateStruct;
  hora: number;
  status: string;
  tipo: string;
  idConvenio: Convenio;

  constructor(consulta?: any) {
    this._id = consulta?._id;
    this.idPaciente = consulta?.idPaciente
      ? new Paciente(consulta?.idPaciente)
      : undefined;
    this.idMedico = consulta?.idMedico
      ? new Medico(consulta?.idMedico)
      : undefined;
    this.data = formatToNgbDate(consulta?.data);
    this.hora = consulta?.hora;
    this.status = consulta?.status;
    this.tipo = consulta?.tipo;
    this.idConvenio = consulta?.idConvenio
      ? new Convenio(consulta?.idConvenio)
      : undefined;
  }
}

export enum ViewModeTypes {
  List,
  Day,
}

export const ConsultaTypes = ["PARTICULAR", "CONVENIO", "RETORNO"];

export const WorkingHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
