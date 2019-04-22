import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Observable, Subject, Subscription } from 'rxjs';
import * as swal from 'sweetalert';
import { EventEmitter } from 'events';

@Injectable()
@NgModule()
export class EmployeeService {
  token: string
  options: Object
  public  empUpdate$

  constructor(private _http: HttpClient) {
    this.empUpdate$ = new Subject();
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

  subscribe(callback): Subscription {
    return this.empUpdate$.subscribe(callback);
  }

  updateInfo(
    user_id, 
    name_of_employee,
    clock_in_time, 
    clock_out_time, 
    active
  )  {
    this.getOptions()
    this._http.patch<any>(env.url(`employee/${user_id}`), {
      name_of_employee,
      clock_in_time,
      clock_out_time,
      active
    }, this.options).subscribe(
      ({ message, data }) => { 
        swal(`Success`, message, `success`) 
        this.empUpdate$.next(data)
      }
    )
  }
}
