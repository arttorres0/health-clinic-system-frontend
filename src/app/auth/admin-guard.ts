import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";
import { ToastService } from "../toast/toast.service";
import { Roles } from "./Roles";

@Injectable({ providedIn: "root" })
export class AdminGuard implements CanActivate {
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

    let role = this.authService.getRole();

    if (role !== Roles.ADMIN) {
      this.router.navigate(["/"]);
      this.toastService.error("Acesso não autorizado");
      return false;
    }

    return true;
  }
}
