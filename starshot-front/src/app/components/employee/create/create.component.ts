import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { DetectChange } from '../../detect-change.component';
import { EmployeeService } from 'src/app/services/employee.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent extends DetectChange {

  name_of_employee: string;
  user_id: Number;
  clock_out_date: string;
  clock_in_date: string;
  clock_in_time: string;
  clock_out_time: string;
  active: Boolean = true;
  errMessage: String = '';
  private subscription: Subscription;

  constructor(private _ref: ChangeDetectorRef, private _service: EmployeeService) {
    super(_ref)
    this.createEmp()
  }

  createEmp() {
    this.subscription = this._service.createErr((data) => {
      this.errMessage = data
      this._ref.detectChanges()
    })
  }

  saveInfo() {
    const clock_in_time = moment(`${this.clock_in_date} ${this.clock_in_time}`).toISOString(),
    clock_out_time = moment(`${this.clock_out_date} ${this.clock_out_time}`).toISOString()

    this._service.addInfo(
      this.user_id,
      this.name_of_employee,
      clock_in_time,
      clock_out_time,
      this.active,
      this.errorHandler
    )
  }

}
