import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../interface/user';

import  httpError  from '../tool/HttpError';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  urlRoute: string = `${environment.apiUrl}/${environment.route.user}`;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }
  
  
  all() {
    return this.http.get<IUser[]>(this.urlRoute);
  }

  add(data:IUser){
  }

  update(id:number,data:IUser) {
  }

  delete(id:number) {
  }

}