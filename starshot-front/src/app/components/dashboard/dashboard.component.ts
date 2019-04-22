import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef, OnInit } from '@angular/core';
import Employees from '../../models/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { DetectChange } from '../detect-change.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent extends DetectChange implements OnInit {
  @Input() appTitle: string;
  @Input() events: Observable<void>;
  private eventsSubscription: any

  employees = []

  constructor(private _ref: ChangeDetectorRef, private _empService: EmployeeService) { 
    super(_ref)
  }

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe(() => this.getEmployees())
  }

  getEmployees(): void {
    this._empService.getEmployees().subscribe(({ data: { docs } }) => { 
      this.employees = docs
      this._ref.detectChanges()
      alert()
    }, this.errorHandler)
  }
}
