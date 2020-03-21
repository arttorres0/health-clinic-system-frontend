import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import * as moment from "moment";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: "root"
})
export class ConsultasService {
  private consultasUrl = environment.serverUrl + "/consultas";

  constructor(private http: HttpClient) {}

  getConsultasDay({
    idPaciente,
    idMedico,
    data
  }: {
    idPaciente?: string;
    idMedico?: string;
    data?: NgbDateStruct;
  }): Observable<any> {
    let dataRequest = {};

    if (idPaciente) dataRequest["idPaciente"] = idPaciente;
    if (idMedico) dataRequest["idMedico"] = idMedico;
    if (data)
      dataRequest["data"] = moment(
        new Date(data.year, data.month - 1, data.day)
      ).format("YYYY-MM-DD");

    let params = new HttpParams({ fromObject: dataRequest });

    return this.http.get(this.consultasUrl, { params });
  }

  getConsultasList({
    idPaciente,
    idMedico,
    page
  }: {
    idPaciente?: string;
    idMedico?: string;
    page?: number;
  }): Observable<any> {
    let dataRequest = {};

    if (idPaciente) dataRequest["idPaciente"] = idPaciente;
    if (idMedico) dataRequest["idMedico"] = idMedico;
    page ? (dataRequest["page"] = page) : (dataRequest["page"] = 1);

    let params = new HttpParams({ fromObject: dataRequest });

    return this.http.get(this.consultasUrl, { params });
  }
}
