import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


import { HttpParams } from "@angular/common/http";
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }
  statsUrl: string = "/api/stats";
  getStats(url: string | null) {
    if (url !== null) {
      const options = { params: new HttpParams().set("url", url) }
      return this.http.get<responseObjectStats>(this.statsUrl, options).pipe(catchError(this.handleError));
    } else {
      return throwError(() => new Error("The url is required"));
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. 
      return throwError(() => new Error("An Network Error occured, try again"));
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.log(error)
      return throwError(() => new Error(error.error));
    }
  }
}


export interface responseObjectStats {
  viewed: number;
  shortened: number;
  queryUrl: string;
}