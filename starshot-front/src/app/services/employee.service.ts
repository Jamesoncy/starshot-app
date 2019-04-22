import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Observable } from 'rxjs';
import Employees from '../models/Employee';

@Injectable()
@NgModule()
export class EmployeeService {
  token: string
  options: Object

  constructor(private _http: HttpClient) { 
    
  }

  getOptions() {
    this.token = localStorage.getItem('token')
    this.options = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.token}`)
    }
  }

  getEmployees(): Observable<any> {
    this.getOptions()
    return this._http.get<any>(env.url('employee/list'), this.options)
  }

}
