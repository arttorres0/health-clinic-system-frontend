import { Paciente } from "../pacientes/Paciente";
import { Medico } from "../medicos/Medico";
import { Convenio } from "../convenios/Convenio";
import { NgbDateStruct, NgbDate } from "@ng-bootstrap/ng-bootstrap";

export class Consulta {
  _id: string;
  idPaciente: Paciente;
  idMedico: Medico;
  data: NgbDateStruct;
  hora: number;
  status: string;
  tipo: string;
  idConvenio: Convenio;

  constructor(consultaResponse?: any) {
    if (consultaResponse) {
      for (let propName in consultaResponse) {
        if (propName === "data") {
          let splitDate = consultaResponse.data.split("-");
          this.data = new NgbDate(
            Number(splitDate[0]),
            Number(splitDate[1]),
            Number(splitDate[2])
          );
        } else if (propName === "idMedico") {
          this.idMedico = new Medico(consultaResponse.idMedico);
        } else if (propName === "idPaciente") {
          this.idPaciente = new Paciente(consultaResponse.idPaciente);
        } else {
          this[propName] = consultaResponse[propName];
        }
      }
    }
  }
}

export enum ViewModeTypes {
  List,
  Day
}

export const ConsultaTypes = ["PARTICULAR", "CONVENIO", "RETORNO"];

export const WorkingHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
