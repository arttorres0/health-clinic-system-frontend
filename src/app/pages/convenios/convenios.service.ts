import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Convenio } from "./Convenio";

@Injectable({
  providedIn: "root"
})
export class ConveniosService {
  private conveniosUrl = environment.serverUrl + "/convenios";

  constructor(private http: HttpClient) {}

  getConveniosList({
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

    return this.http.get(this.conveniosUrl, { params });
  }

  getConvenio(idConvenio: string): Observable<any> {
    return this.http.get(this.conveniosUrl + "/" + idConvenio);
  }

  saveConvenio(convenio: Convenio): Observable<any> {
    let body = {
      nome: convenio.nome
    };

    return this.http.post(this.conveniosUrl, body);
  }

  updateConvenio(convenio: Convenio, ativo?: boolean): Observable<any> {
    let body = JSON.parse(JSON.stringify(convenio));

    delete body["_id"];

    if (typeof ativo !== "undefined") body["ativo"] = ativo;

    return this.http.put(this.conveniosUrl + "/" + convenio._id, body);
  }
}
