import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { DetectChange } from '../../detect-change.component';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html'
})
export class DeleteComponent extends DetectChange {

  @Input() emp_name: string
  @Input() user_id: Number

  constructor(private _ref: ChangeDetectorRef, private _service: EmployeeService) { 
    super(_ref)
  }

  deleteInfo() {
    this._service.deleteInfo(this.user_id)
  }
}
