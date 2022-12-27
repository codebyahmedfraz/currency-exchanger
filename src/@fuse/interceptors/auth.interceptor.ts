import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import * as environment from '@environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const urlAppendedReq = request.clone({
      url: `${environment.environment.apiBaseUrl}${request.url}`
    })

    const headersAppendedReq = urlAppendedReq.clone({
      headers: request.headers.set(
        "apiKey",
        environment.environment.apiKey
      ),
    })
    return next.handle(headersAppendedReq);
  }
}
