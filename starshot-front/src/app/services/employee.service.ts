import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Observable } from 'rxjs';

interface Employees {
  user_id: string,
  name_of_employee: string,
  clock_in_time: string,
  clock_out_time: string,
  status: boolean
}

@Injectable()
@NgModule()
export class EmployeeService {
  token: string
  options: Object

  constructor(private http: HttpClient) { 
    this.token = localStorage.getItem('token')
    this.options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Basic ${this.token}`
      })
    }
  }

  getEmployees(): Observable<Employees[]> {
    return this.http.get<Employees[]>(env.url('employees'), this.options)
  }

}
