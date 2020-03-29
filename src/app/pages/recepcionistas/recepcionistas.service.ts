import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Recepcionista } from "./Recepcionista";
import { formatToStringDate } from "src/app/shared/utils/FormatDate";

@Injectable({
  providedIn: "root"
})
export class RecepcionistasService {
  private recepcionistasUrl = environment.serverUrl + "/recepcionistas";

  constructor(private http: HttpClient) {}

  getRecepcionistasList({
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

    return this.http.get(this.recepcionistasUrl, { params });
  }

  getRecepcionista(idRecepcionista: string): Observable<any> {
    return this.http.get(this.recepcionistasUrl + "/" + idRecepcionista);
  }

  saveRecepcionista(recepcionista: Recepcionista): Observable<any> {
    let body = {
      nome: recepcionista.nome,
      login: recepcionista.login,
      senha: recepcionista.senha,
      cpf: recepcionista.cpf,
      email: recepcionista.email,
      telefone: recepcionista.telefone,
      dataDeNascimento: formatToStringDate(recepcionista.dataDeNascimento),
      dataDeAdmissao: formatToStringDate(recepcionista.dataDeAdmissao)
    };

    return this.http.post(this.recepcionistasUrl, body);
  }

  updateRecepcionista(
    recepcionista: Recepcionista,
    ativo?: boolean
  ): Observable<any> {
    let body = JSON.parse(JSON.stringify(recepcionista));

    delete body["_id"];
    body["dataDeNascimento"] = formatToStringDate(
      recepcionista.dataDeNascimento
    );
    body["dataDeAdmissao"] = formatToStringDate(recepcionista.dataDeAdmissao);

    if (typeof ativo !== "undefined") body["ativo"] = ativo;

    return this.http.put(
      this.recepcionistasUrl + "/" + recepcionista._id,
      body
    );
  }
}
