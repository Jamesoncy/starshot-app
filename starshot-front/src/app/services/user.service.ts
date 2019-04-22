import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Observable } from 'rxjs';

interface Token {
  body: {
    message: string,
    data: Object
  }
}

@Injectable()
@NgModule()
export class UserService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) : Observable<Token>{
    return this.http.post<Token>(env.url('login'), { username, password })
  }
}
