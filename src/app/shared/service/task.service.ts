import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITask } from '../interface/task';
import  httpError  from '../tool/HttpError';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  urlRoute: string = `${environment.apiUrl}/${environment.route.task}`;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  all(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.urlRoute);
  }

  add(data:ITask): Observable<ITask>{
    return this.http.post<ITask>(this.urlRoute, data, { headers: this.headers }).pipe(catchError( httpError ));
  }

  update(id:number,data:ITask): Observable<ITask> {
    let API_URL = `${this.urlRoute}/${id}`;
    return this.http.put<ITask>(API_URL, data, { headers: this.headers }).pipe(catchError( httpError ));
  }

  updateDate(id:number,data:ITask): Observable<ITask> {
    let API_URL = `${this.urlRoute}/fecha/${id}`;
    return this.http.put<ITask>(API_URL, data, { headers: this.headers }).pipe(catchError( httpError ));
  }

  delete(id:number): Observable<string> {
    var API_URL = `${this.urlRoute}/${id}`;
    return this.http.delete<string>(API_URL).pipe(catchError( httpError ));
  }

}