import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
@NgModule()
export class UserService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) : Observable<any>{
    return this.http.post<any>(env.url('login'), { username, password })
  }
}
