import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";

import { Observable } from "rxjs";
import { AuthService } from "./auth/auth.service";

@Injectable()
export class ReqInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = req.headers
      .set("Content-Type", "application/json")
      .set("Accept", "*/*")
      .set("Authorization", "Bearer " + this.authService.getToken());

    let newReq = req.clone({ headers });

    return next.handle(newReq);
  }
}
