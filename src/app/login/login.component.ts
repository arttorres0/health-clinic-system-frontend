import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { LoadingService } from "../loading/loading.service";
import { ToastService } from "../toast/toast.service";

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
    private loadingService: LoadingService,
    private toastService: ToastService
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
        this.loadingService.setLoadingBoolean(false);
        this.toastService.success(response.message);
      },
      error => {
        this.loadingService.setLoadingBoolean(false);
        this.toastService.error(error.error.message);
      }
    );
  }
}
