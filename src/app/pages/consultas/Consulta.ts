import { Paciente } from "../pacientes/Paciente";
import { Medico } from "../medicos/Medico";

export class Consulta {
  _id: string;
  idPaciente: Paciente;
  idMedico: Medico;
  data: string;
  hora: number;
  status: string;
  tipo: string;
  //TODO: change convenio from any to Convenio class
  idConvenio: any;
  createdAt: string;
  updatedAt: string;
}
