import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Observable, Subject, Subscription } from 'rxjs';
import * as swal from 'sweetalert';
import * as moment from 'moment';
import Validator from "validatorjs";

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

  validateEmp(cloneData) {
    const data = Object.assign({},cloneData)

    data.clock_in_time = new Date(data.clock_in_time)
    data.clock_out_time = new Date(data.clock_out_time)
    
    const
      rules = {
      user_id: "required|integer", 
      name_of_employee: "required",
      clock_in_time: "required|date", 
      clock_out_time: `required|date|after_or_equal:clock_in_time`, 
      active: "required|boolean"
    },
    customMessage = {
      "before.clock_out_time": `Clock Out Time must be higher than ${ data.clock_in_time }`
    },


    validation = new Validator(data, rules, customMessage);

    if (validation.fails()) {
      const validate = validation.errors.all();
      const key = Object.keys(validate)[0];
      const errorMessage = validate[key][0];
      setTimeout(() => swal("Oops!", errorMessage, "error"), 100);
      return true;
    }
    return false
  }

  updateInfo(
    user_id, 
    name_of_employee,
    clock_in_time, 
    clock_out_time, 
    active,
    errHandler
  )  {
    const data = {
      user_id, 
      name_of_employee,
      clock_in_time, 
      clock_out_time, 
      active
    };
    const bool = this.validateEmp(data)

    if (bool) {
      return
    }
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
    const data = {
      user_id, 
      name_of_employee,
      clock_in_time, 
      clock_out_time, 
      active
    };
    const bool = this.validateEmp(data)
  
    if (bool) {
      return
    }

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
