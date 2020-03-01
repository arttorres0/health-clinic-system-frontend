import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";

import { AuthService } from "./auth.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    let token = this.authService.getToken();

    if (!token) {
      this.router.navigate(["/login"]);
      return false;
    }

    if (this.authService.isTokenExpired(token)) {
      this.router.navigate(["/login"]);
      //TODO: toast service - session expired
      return false;
    }

    return true;
  }
}
