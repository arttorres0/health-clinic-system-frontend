import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Medicamento } from "./Medicamento";

@Injectable({
  providedIn: "root"
})
export class MedicamentosService {
  private medicamentosUrl = environment.serverUrl + "/medicamentos";

  constructor(private http: HttpClient) {}

  getMedicamentosList({
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

    return this.http.get(this.medicamentosUrl, { params });
  }

  getMedicamento(idMedicamento: string): Observable<any> {
    return this.http.get(this.medicamentosUrl + "/" + idMedicamento);
  }

  saveMedicamento(medicamento: Medicamento): Observable<any> {
    let body = {
      nomeGenerico: medicamento.nomeGenerico,
      nomeDeFabrica: medicamento.nomeDeFabrica,
      fabricante: medicamento.fabricante
    };

    return this.http.post(this.medicamentosUrl, body);
  }

  updateMedicamento(
    medicamento: Medicamento,
    ativo?: boolean
  ): Observable<any> {
    let body = JSON.parse(JSON.stringify(medicamento));

    delete body["_id"];

    if (typeof ativo !== "undefined") body["ativo"] = ativo;

    return this.http.put(this.medicamentosUrl + "/" + medicamento._id, body);
  }
}
