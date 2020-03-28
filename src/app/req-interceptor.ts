import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from "@angular/common/http";

import { Observable, of } from "rxjs";
import { AuthService } from "./auth/auth.service";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { ToastService } from "./toast/toast.service";
import { LoadingService } from "./loading/loading.service";

@Injectable()
export class ReqInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = req.headers
      .set("Content-Type", "application/json")
      .set("Accept", "*/*")
      .set("Authorization", "Bearer " + this.authService.getToken());

    let newReq = req.clone({ headers });

    return next.handle(newReq).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(["/login"]);
            this.loadingService.setLoadingBoolean(false);
            this.toastService.error(err.error.message);
          }
        }
        return of(err);
      })
    );
  }
}
