import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { LoadingService } from "src/app/loading/loading.service";
import { ToastService } from "src/app/toast/toast.service";

@Component({
  selector: "app-credenciais-admin",
  templateUrl: "./credenciais-admin.component.html",
  styleUrls: ["./credenciais-admin.component.scss"]
})
export class CredenciaisAdminComponent implements OnInit {
  editMode: boolean;
  login: string;
  senha: string;

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.login = "";
    this.senha = "";
    this.getAdminCredentials();
  }

  getAdminCredentials(): void {
    this.editMode = false;
    this.loadingService.setLoadingBoolean(true);

    this.authService.getAdminCredentials().subscribe(
      response => {
        this.login = response.login;
        this.senha = response.senha;
        this.loadingService.setLoadingBoolean(false);
      },
      error => {
        this.loadingService.setLoadingBoolean(false);
        this.toastService.error(error.error.message);
      }
    );
  }

  updateAdminCredentials() {
    this.loadingService.setLoadingBoolean(true);

    this.authService.updateAdminCredentials(this.login, this.senha).subscribe(
      response => {
        this.getAdminCredentials();
        this.toastService.success(response.message);
      },
      error => {
        this.loadingService.setLoadingBoolean(false);
        this.toastService.error(error.error.message);
      }
    );
  }
}
