import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { LoadingService } from "../loading/loading.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  private login: string;
  private senha: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.login = "";
    this.senha = "";
  }

  ngOnInit() {}

  getClinicName(): string {
    return environment.clinicName;
  }

  doLogin(): void {
    this.loadingService.setLoadingBoolean(true);

    this.authService.doLogin(this.login, this.senha).subscribe(
      response => {
        this.authService.setToken(response["token"]);
        this.router.navigate(["/"]);
        //TODO: toast service with response.message
      },
      error => {
        //TODO: toast service with error.message
      },
      () => this.loadingService.setLoadingBoolean(false)
    );
  }
}
