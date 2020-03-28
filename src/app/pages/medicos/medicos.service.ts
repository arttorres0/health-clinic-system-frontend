import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Medico } from "./Medico";
import { formatToStringDate } from "src/app/shared/utils/FormatDate";

@Injectable({
  providedIn: "root"
})
export class MedicosService {
  private medicosUrl = environment.serverUrl + "/medicos";

  constructor(private http: HttpClient) {}

  getMedicosList({
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

    return this.http.get(this.medicosUrl, { params });
  }

  getMedico(idMedico: string): Observable<any> {
    return this.http.get(this.medicosUrl + "/" + idMedico);
  }

  saveMedico(medico: Medico): Observable<any> {
    let body = {
      nome: medico.nome,
      login: medico.login,
      senha: medico.senha,
      cpf: medico.cpf,
      email: medico.email,
      telefone: medico.telefone,
      crm: medico.crm,
      dataDeNascimento: formatToStringDate(medico.dataDeNascimento),
      dataDeAdmissao: formatToStringDate(medico.dataDeAdmissao)
    };

    return this.http.post(this.medicosUrl, body);
  }

  updateMedico(medico: Medico, ativo?: boolean): Observable<any> {
    let body = JSON.parse(JSON.stringify(medico));

    delete body["_id"];
    body["dataDeNascimento"] = formatToStringDate(medico.dataDeNascimento);
    body["dataDeAdmissao"] = formatToStringDate(medico.dataDeAdmissao);

    if (typeof ativo !== "undefined") body["ativo"] = ativo;

    return this.http.put(this.medicosUrl + "/" + medico._id, body);
  }
}
