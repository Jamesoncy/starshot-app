import { Component, Input, ChangeDetectorRef, OnInit, ComponentFactoryResolver, Injector } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { DetectChange } from '../detect-change.component';
import { Observable } from 'rxjs';
import * as swal from 'sweetalert';
import { UpdateComponent } from '../employee/update/update.component'
import { Subscription } from 'rxjs'
import { findIndex, sortBy } from 'lodash'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent extends DetectChange implements OnInit {
  @Input() appTitle: string;
  @Input() events: Observable<void>;
  private eventsSubscription: any
  private empUpdate: any
  private subscription: Subscription;

  public minDate: Date = new Date ("05/07/2017");
  public maxDate: Date = new Date ("05/27/2017");
  public value: Date = new Date ("05/16/2017");

  public updateComponent;

  employees = []

  constructor(private _ref: ChangeDetectorRef, private _empService: EmployeeService, private _resolve: ComponentFactoryResolver, private _injector: Injector) { 
    super(_ref)
    this.subscription = _empService.subscribe((data) => {
      const { 
        user_id
      } = data,
        index = findIndex(this.employees, (obj) => obj.user_id === user_id)
     
      this.employees.splice(index, 1)
      this.employees.unshift(data)
      this.employees = sortBy(this.employees, ['user_id'])
      this._ref.detectChanges()
    })
  }

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe(() => this.getEmployees())
    this._empService.empUpdate$.subscribe()
  }

  getEmployees(): void {
    this._empService.getEmployees().subscribe(({ data: { docs } }) => { 
      this.employees = docs
    }, this.errorHandler)
  }

  onUpdate(user_id) {
    const updateFactory = this._resolve.resolveComponentFactory(UpdateComponent),
      updateComponent = updateFactory.create(this._injector)

      updateComponent.instance.user_id = user_id
      updateComponent.instance.applyInfo(this.employees).subscribe(() => {
        updateComponent.changeDetectorRef.detectChanges()

        swal({
          content: updateComponent.location.nativeElement,
          icon: 'info',
          title: 'Update Employee Info',
          buttons: {}
        })
      })
  }

  displayCounter(event) {
    alert()
  }

  onDelete(user_id) {
    alert(user_id)
  }
}
