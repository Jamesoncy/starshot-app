import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, EventEmitter, Output, ComponentFactoryResolver, Injector } from '@angular/core';
import { DetectChange } from '../../detect-change.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { findLast } from 'lodash'
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateComponent extends DetectChange implements OnInit {

  name_of_employee: string
  user_id: Number;
  clock_out_date: string
  clock_in_date: string
  clock_in_time: string
  clock_out_time: string
  active: Boolean = true

  private updateInfo = new EventEmitter();

  constructor(private _ref: ChangeDetectorRef, private _service: EmployeeService, private _resolve: ComponentFactoryResolver, private _injector: Injector) { 
    super(_ref)

  }

  applyInfo(employees): any {
    return new Observable((observer) => {
      const {
        name_of_employee,
        clock_in_time,
        clock_out_time,
        active
      } = findLast(employees, (emp) => emp.user_id === this.user_id )
      
      this.name_of_employee = name_of_employee
      this.clock_in_time = moment(clock_in_time).format('hh:mm')
      this.clock_in_date = moment(clock_in_time).format('YYYY-MM-DD')
      this.clock_out_time = moment(clock_out_time).format('hh:mm')
      this.clock_out_date = moment(clock_out_time).format('YYYY-MM-DD')
      this.active = active

      observer.next(true)
    })
  }

  ngOnInit() {
  }

  saveInfo() {
    const clock_in_time = moment(`${this.clock_in_date} ${this.clock_in_time}`).toISOString(),
    clock_out_time = moment(`${this.clock_out_date} ${this.clock_out_time}`).toISOString()
    
    this._service.updateInfo(
      this.user_id, 
      this.name_of_employee,
      clock_in_time, 
      clock_out_time, 
      this.active,
      this.errorHandler
    )
  }
}
