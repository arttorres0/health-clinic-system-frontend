import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import * as jwt_decode from "jwt-decode";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private loginUrl = environment.serverUrl + "/login";

  constructor(private http: HttpClient, private router: Router) {}

  doLogin(login: string, senha: string): Observable<any> {
    let dataRequest = {
      login,
      senha
    };

    return this.http.post(this.loginUrl, dataRequest);
  }

  logout(): void {
    localStorage.removeItem("access-token");
    this.router.navigate(["/login"]);
  }

  getToken(): string {
    return localStorage.getItem("access-token");
  }

  setToken(token: string): void {
    localStorage.setItem("access-token", token);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(): boolean {
    let token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  //TODO: implement getLoginId method
  // getLoginId(): string {}
}
