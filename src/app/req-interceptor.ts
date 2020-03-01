import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders
} from "@angular/common/http";

import { Observable } from "rxjs";

@Injectable()
export class ReqInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = req.headers
      .set("Content-Type", "application/json")
      .set("Accept", "*/*");
    //TODO: if request is not /login, set authorization header

    const newReq = req.clone({ headers });

    return next.handle(newReq);
  }
}
