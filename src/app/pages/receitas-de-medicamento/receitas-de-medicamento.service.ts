import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { formatToStringDate } from "src/app/shared/utils/FormatDate";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { ReceitaDeMedicamento } from "./ReceitaDeMedicamento";

@Injectable({
  providedIn: "root"
})
export class ReceitasDeMedicamentoService {
  private receitasDeMedicamentoUrl =
    environment.serverUrl + "/receitasDeMedicamento";

  constructor(private http: HttpClient) {}

  getReceitasDeMedicamentoList({
    idPaciente,
    idMedico,
    data,
    page
  }: {
    idPaciente?: string;
    idMedico?: string;
    data?: NgbDateStruct;
    page?: number;
  }): Observable<any> {
    let dataRequest = {};

    if (idPaciente) dataRequest["idPaciente"] = idPaciente;
    if (idMedico) dataRequest["idMedico"] = idMedico;
    if (data) dataRequest["data"] = formatToStringDate(data);
    page ? (dataRequest["page"] = page) : (dataRequest["page"] = 1);

    let params = new HttpParams({ fromObject: dataRequest });

    return this.http.get(this.receitasDeMedicamentoUrl, { params });
  }

  getReceitaDeMedicamento(idReceitaDeMedicamento: string): Observable<any> {
    return this.http.get(
      this.receitasDeMedicamentoUrl + "/" + idReceitaDeMedicamento
    );
  }

  saveReceitaDeMedicamento(
    receitaDeMedicamento: ReceitaDeMedicamento
  ): Observable<any> {
    let body = {
      idPaciente: receitaDeMedicamento.idPaciente._id,
      idMedico: receitaDeMedicamento.idMedico._id,
      data: formatToStringDate(receitaDeMedicamento.data),
      idMedicamento: receitaDeMedicamento.idMedicamento._id,
      observacao: receitaDeMedicamento.observacao
    };

    return this.http.post(this.receitasDeMedicamentoUrl, body);
  }
}
