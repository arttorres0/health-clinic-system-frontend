import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class PacientesService {
  private pacientesUrl = environment.serverUrl + "/pacientes";

  constructor(private http: HttpClient) {}

  getPacientes({
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
}
