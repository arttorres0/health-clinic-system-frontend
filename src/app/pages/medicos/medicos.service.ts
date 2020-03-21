import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class MedicosService {
  private medicosUrl = environment.serverUrl + "/medicos";

  constructor(private http: HttpClient) {}

  getMedicos({
    filter,
    page
  }: {
    filter?: string;
    page?: number;
  }): Observable<any> {
    let dataRequest = {};

    if (filter) dataRequest["filter"] = filter;
    if (page) dataRequest["page"] = page;

    let params = new HttpParams({ fromObject: dataRequest });

    return this.http.get(this.medicosUrl, { params });
  }
}
