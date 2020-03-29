import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Paciente } from "./Paciente";
import { formatToStringDate } from "src/app/shared/utils/FormatDate";

@Injectable({
  providedIn: "root"
})
export class PacientesService {
  private pacientesUrl = environment.serverUrl + "/pacientes";

  constructor(private http: HttpClient) {}

  getPacientesList({
    filter,
    page,
    ativo
  }: {
    filter?: string;
    page?: number;
    ativo?: boolean;
  }): Observable<any> {
    let dataRequest = {};

    if (filter) dataRequest["filter"] = filter;
    if (page) dataRequest["page"] = page;
    if (ativo != undefined) dataRequest["ativo"] = ativo;

    let params = new HttpParams({ fromObject: dataRequest });

    return this.http.get(this.pacientesUrl, { params });
  }

  getPaciente(idPaciente: string): Observable<any> {
    return this.http.get(this.pacientesUrl + "/" + idPaciente);
  }

  savePaciente(paciente: Paciente): Observable<any> {
    let body = {
      nome: paciente.nome,
      cpf: paciente.cpf,
      email: paciente.email,
      telefone: paciente.telefone,
      dataDeNascimento: formatToStringDate(paciente.dataDeNascimento)
    };

    return this.http.post(this.pacientesUrl, body);
  }

  updatePaciente(paciente: Paciente, ativo?: boolean): Observable<any> {
    let body = JSON.parse(JSON.stringify(paciente));

    delete body["_id"];
    body["dataDeNascimento"] = formatToStringDate(paciente.dataDeNascimento);

    if (typeof ativo !== "undefined") body["ativo"] = ativo;

    return this.http.put(this.pacientesUrl + "/" + paciente._id, body);
  }
}
