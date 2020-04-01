import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { formatToStringDate } from "src/app/shared/utils/FormatDate";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { SolicitacaoDeExame } from "./SolicitacaoDeExame";

@Injectable({
  providedIn: "root"
})
export class SolicitacoesDeExameService {
  private solicitacoesDeExameUrl =
    environment.serverUrl + "/solicitacoesDeExame";

  constructor(private http: HttpClient) {}

  getSolicitacoesDeExameList({
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

    return this.http.get(this.solicitacoesDeExameUrl, { params });
  }

  getExamTypesList(): Observable<any> {
    return this.http.get(this.solicitacoesDeExameUrl + "/listaDeTiposDeExames");
  }

  getSolicitacaoDeExame(idSolicitacaoDeExame: string): Observable<any> {
    return this.http.get(
      this.solicitacoesDeExameUrl + "/" + idSolicitacaoDeExame
    );
  }

  saveSolicitacaoDeExame(
    receitaDeMedicamento: SolicitacaoDeExame
  ): Observable<any> {
    let body = {
      idPaciente: receitaDeMedicamento.idPaciente._id,
      idMedico: receitaDeMedicamento.idMedico._id,
      data: formatToStringDate(receitaDeMedicamento.data),
      exames: receitaDeMedicamento.exames,
      observacao: receitaDeMedicamento.observacao
    };

    return this.http.post(this.solicitacoesDeExameUrl, body);
  }

  saveResultSolicitacaoDeExame(
    idSolicitacaoDeExame: string,
    result: File
  ): Observable<any> {
    let formData = new FormData();
    formData.append("arquivoResultadoExame", result, result.name);

    return this.http.put(
      this.solicitacoesDeExameUrl + "/resultado/" + idSolicitacaoDeExame,
      formData
    );
  }

  getResultSolicitacaoDeExame(idSolicitacaoDeExame: string): Observable<Blob> {
    return this.http.get(
      this.solicitacoesDeExameUrl + "/resultado/" + idSolicitacaoDeExame,
      { responseType: "blob" }
    );
  }
}
