import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";
import { ToastService } from "../toast/toast.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  canActivate(): boolean {
    let token = this.authService.getToken();

    if (!token) {
      this.router.navigate(["/login"]);
      return false;
    }

    if (this.authService.isTokenExpired(token)) {
      this.authService.logout();
      this.toastService.error("Sessão expirada");
      return false;
    }

    return true;
  }
}
