import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../interface/user';
import { Observable } from "rxjs";
import  httpError  from '../tool/HttpError';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  urlRoute: string = `${environment.apiUrl}/${environment.route.user}`;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }
  
  
  all(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.urlRoute);
  }

  add(data:IUser): Observable<IUser>{
    return this.http.post<IUser>(this.urlRoute, data, { headers: this.headers }).pipe(catchError( httpError ));
  }

  update(id:number,data:IUser): Observable<IUser> {
    let API_URL = `${this.urlRoute}/${id}`;
    return this.http.put<IUser>(API_URL, data, { headers: this.headers }).pipe(catchError( httpError ));
  }

  delete(id:number): Observable<string> {
    var API_URL = `${this.urlRoute}/${id}`;
    return this.http.delete<string>(API_URL).pipe(catchError( httpError ));
  }

}