import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpSentEvent,
  HttpUserEvent,
  HttpResponse,
  HttpProgressEvent,
  HttpHeaderResponse,
  HttpErrorResponse,
  HttpResponseBase
} from '@angular/common/http';
import { catchError, Observable, tap, lastValueFrom, from } from 'rxjs';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent |
    HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

    return from(this.handle(req, next));
  }
  async handle(req: HttpRequest<any>, next: HttpHandler): Promise<HttpSentEvent |
    HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const authReq = this.addAuthorizationHeader(req);
    return await lastValueFrom(next.handle(authReq).pipe(tap((event: HttpEvent<any>) => {
      return event;
    }),
      catchError(ex => {
        return this.handleError(req, next, ex);
      })));
  }



  handleError(req: HttpRequest<any>, next: HttpHandler, ex: any): Promise<HttpEvent<any>> {
    if (!navigator.onLine) {
      console.error('not connected to internet', 'Network');
    }
    if (ex instanceof HttpErrorResponse) {
      switch ((ex as HttpErrorResponse).status) {
        case 400:
          console.log('400 error at interceptor', ex);
          break;
        case 401: // Unauthorized
          console.log('401 error at interceptor', ex);
          break;
        case 403: // Forbidden
          return Promise.reject('You are not authorized to access the request');
        case 500: // Internal server error
        default:
          console.log('Error at interceptor', ex);
          if (ex.status === 0) {
            console.log('A client-side or network error occurred. Handle it accordingly.');
          }
      }
    }
    return Promise.reject(ex);
  }
  addAuthorizationHeader(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        'x-apikey': 'D0277D9C26584D91A9255306C45DE4E6'
      }
    });
  }


}


