import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { formatToStringDate } from "src/app/shared/utils/FormatDate";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { Consulta } from "./Consulta";

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
    if (data) dataRequest["data"] = formatToStringDate(data);

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

  getConsulta(idConsulta: string): Observable<any> {
    return this.http.get(this.consultasUrl + "/" + idConsulta);
  }

  saveConsulta(consulta: Consulta): Observable<any> {
    let body = {
      idPaciente: consulta.idPaciente._id,
      idMedico: consulta.idMedico._id,
      data: formatToStringDate(consulta.data),
      hora: consulta.hora,
      tipo: consulta.tipo
    };

    if (consulta.tipo === "CONVENIO" && consulta.idConvenio)
      body["idConvenio"] = consulta.idConvenio._id;

    return this.http.post(this.consultasUrl, body);
  }

  updateConsulta(consulta: Consulta, status?: string): Observable<any> {
    let body = JSON.parse(JSON.stringify(consulta));

    delete body["_id"];
    delete body["createdAt"];
    delete body["updatedAt"];
    delete body["__v"];
    body["idPaciente"] = consulta.idPaciente._id;
    body["idMedico"] = consulta.idMedico._id;
    body["data"] = formatToStringDate(consulta.data);

    if (consulta.tipo === "CONVENIO" && consulta.idConvenio)
      body["idConvenio"] = consulta.idConvenio._id;
    if (status) body["status"] = status;

    return this.http.put(this.consultasUrl + "/" + consulta._id, body);
  }

  deleteConsulta(consulta: Consulta): Observable<any> {
    return this.http.delete(this.consultasUrl + "/" + consulta._id);
  }
}
