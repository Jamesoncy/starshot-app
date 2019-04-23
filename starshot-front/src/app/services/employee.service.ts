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
  public  empCreate$
  public  empDelete$

  constructor(private _http: HttpClient) {
    this.empUpdate$ = new Subject();
    this.empCreate$ = new Subject();
    this.empDelete$ = new Subject();
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

  updateSubscribe(callback): Subscription {
    return this.empUpdate$.subscribe(callback);
  }

  createSubscribe(callback): Subscription {
    return this.empCreate$.subscribe(callback);
  }

  deleteSubscribe(callback): Subscription {
    return this.empDelete$.subscribe(callback);
  }

  updateInfo(
    user_id, 
    name_of_employee,
    clock_in_time, 
    clock_out_time, 
    active,
    errHandler
  )  {
    this.getOptions()
    this.showLoading()
    this._http.patch<any>(env.url(`employee/${user_id}`), {
      name_of_employee,
      clock_in_time,
      clock_out_time,
      active
    }, this.options).subscribe(
      ({ message, data }) => { 
        swal(`Success`, message, `success`) 
        this.empUpdate$.next(data)
      },
      errHandler
    )
  }

  addInfo(
    user_id, 
    name_of_employee,
    clock_in_time, 
    clock_out_time, 
    active,
    errHandler) {
    this.getOptions()
    this.showLoading()
    this._http.post<any>(env.url(`employee`), {
      user_id,
      name_of_employee,
      clock_in_time,
      clock_out_time,
      active
    }, this.options).subscribe(
      ({ message, data }) => { 
        swal(`Success`, message, `success`) 
        this.empCreate$.next(data)
      },
      errHandler
    )
  }

  searcEmp(search, status, pageSize = 1): Observable<any>  {
    this.getOptions()
    const options = Object.assign({}, this.options, { params: {
      search, status
    }})

    return this._http.get<any>(env.url(`employee/list/${pageSize}`), options)
  }

  showLoading() {
    swal({
      icon: 'info',
      text: 'Loading',
      buttons: {}
    })
  }

  deleteInfo(user_id) {
    this.showLoading()
    this.getOptions()
    this._http.delete<any>(env.url(`employee/${user_id}`), this.options).subscribe(
      ({ message, data }) => {
        swal(`Success`, message, `success`) 
        this.empDelete$.next(data)
      }
    )
  }
}
