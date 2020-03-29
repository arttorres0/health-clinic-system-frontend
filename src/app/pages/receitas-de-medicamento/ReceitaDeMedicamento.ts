import { Paciente } from "../pacientes/Paciente";
import { Medico } from "../medicos/Medico";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { formatToNgbDate } from "src/app/shared/utils/FormatDate";
import { Medicamento } from "../medicamentos/Medicamento";

export class ReceitaDeMedicamento {
  _id: string;
  idPaciente: Paciente;
  idMedico: Medico;
  idMedicamento: Medicamento;
  data: NgbDateStruct;
  observacao: string;

  constructor(receitaDeMedicamento?: any) {
    this._id = receitaDeMedicamento?._id;
    this.idPaciente = new Paciente(receitaDeMedicamento?.idPaciente);
    this.idMedico = new Medico(receitaDeMedicamento?.idMedico);
    this.idMedicamento = new Medicamento(receitaDeMedicamento?.idMedicamento);
    this.data = formatToNgbDate(receitaDeMedicamento?.data);
    this.observacao = receitaDeMedicamento?.observacao;
  }
}
