import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export abstract class DataService {
  baseUrl: string;
  constructor(protected http: HttpClient) {
    this.baseUrl = environment.backendUrl;
  }

  get<T>(path: string, queryParameters?: any): Observable<T[]> {
    const url = this.getUrl(path, null, this.createHttpParams(queryParameters));
    const headers = { headers: {} };
    return this.http.get(url, headers)
      .pipe(map(response => {
        return response as T[];
      })
      );
  }

  getSingle<T>(path: string, id?: string | number | null, queryParameters: any = null): Observable<T> {
    const url = this.getUrl(path, id, this.createHttpParams(queryParameters));

    return this.http.get(url)
      .pipe(map(response => {
        return response as T;
      })
      );
  }

  post<T>(path: string, data: T, queryParameters?: {}): Observable<any> {
    const url = this.getUrl(path, null, this.createHttpParams(queryParameters));
    let httpOptions;
    if (typeof data === 'string' || data instanceof String) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      };
    }

    return this.http.post(url, data, httpOptions)
      .pipe(map(response => {
        return response;
      }));
    //finalize(() => stop));
  }

  put<T>(path: string, id: string | number | boolean, data: T, queryParameters: any | null = null): Observable<any> {
    const url = this.getUrl(path, id, this.createHttpParams(queryParameters));
    return this.http.put(url, data)
      .pipe(map(response => {
        return response;
      }));
  }

  delete<T>(path: string, id: string | number): Observable<any> {
    const url = this.getUrl(path, id);
    return this.http.delete(url)
      .pipe(map(response => {
        return response;
      }));
  }

  protected getUrl(path: string, id?: string | number | boolean | null, queryParameters?: HttpParams): string {
    let url = `${this.baseUrl}/${path}`;
    if (id) {
      url += '/' + id;
    }
    if (queryParameters && queryParameters.keys().length > 0) {
      url = url.concat('?' + queryParameters.toString());
    }
    return url;
  }

  protected createHttpParams(params: {} | undefined): HttpParams {
    let httpParams: HttpParams = new HttpParams();
    if (!params || this.isEmpty(params)) {
      return httpParams;
    }
    Object.keys(params).forEach(param => {
      const itm = (params as any)[param];
      // const itm = param;
      if (itm) {
        if (Array.isArray(itm)) {
          itm.forEach(val => {
            httpParams = httpParams.append(param, val);
          });
        } else {
          httpParams = httpParams.set(param, itm);
        }
      }
    });

    return httpParams;
  }

  private isEmpty(obj: any): boolean {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
}
