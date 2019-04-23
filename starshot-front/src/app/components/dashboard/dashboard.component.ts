import { Component, Input, ChangeDetectorRef, OnInit, ComponentFactoryResolver, Injector } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { DetectChange } from '../detect-change.component';
import { Observable, Subscription } from 'rxjs';
import { CreateComponent } from '../employee/create/create.component';
import { UpdateComponent } from '../employee/update/update.component';
import { DeleteComponent } from '../employee/delete/delete.component';
import { findIndex, sortBy } from 'lodash';
import * as moment from 'moment';
import * as swal from 'sweetalert';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent extends DetectChange implements OnInit {
  @Input() appTitle: string;
  @Input() events: Observable<void>;
  private eventsSubscription: any;
  private empUpdate: any;
  private subscription: Subscription;
  private employees = [];
  private status: String = '';
  private search: String = '';
  private showPage: Boolean = true;
  pageSize: number = 0;
  collectionSize: number = 0;

  constructor(private _ref: ChangeDetectorRef, private _empService: EmployeeService, private _resolve: ComponentFactoryResolver, private _injector: Injector) { 
    super(_ref)
    this.updateEmp()
    this.createEmp()
    this.deleteEmp()
  }

  createEmp() {
    this.subscription = this._empService.createSubscribe((data) => {
      this.employees.pop()
      this.employees.push(data)
      this.employees = sortBy(this.employees, ['user_id']).reverse()
      this.collectionSize = this.collectionSize + 1
    })
  }

  updateEmp() {
    this.subscription = this._empService.updateSubscribe((data) => {
      const { 
        user_id
      } = data,
        index = findIndex(this.employees, (obj) => obj.user_id === user_id)
     
      this.employees.splice(index, 1)
      this.employees.unshift(data)
      this.employees = sortBy(this.employees, ['user_id']).reverse()
    })
  }

  onSearch(pageSize = 1) {
    this.showPage = false
    this._empService.searcEmp(this.search, this.status, pageSize).subscribe(
      ({ data: { docs, total, limit } }) => {
        this.employees = docs
        this.pageSize = limit
        this.collectionSize = total
        this.showPage = true
      },
      this.errorHandler
    )
  }

  pageNumber($event) {
    this.onSearch($event)
  }

  deleteEmp() {
    this.subscription = this._empService.deleteSubscribe(({ user_id }) => {
      const index = findIndex(this.employees, (obj) => obj.user_id === user_id)
      this.employees.splice(index, 1)
      this.getEmployees()
    })
  }

  fixDate(date) {
    return moment(date).format('YYYY-MM-DD hh:mm A')
  }

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe(() => this.getEmployees())
  }

  getEmployees(): void {
    this.showPage = false
    this._empService.getEmployees().subscribe(({ data: { docs, total, limit } }) => { 
      this.employees = docs
      this.pageSize = limit
      this.collectionSize = total
      this.showPage = true
    }, this.errorHandler)
  }

  createInfo() {
    const updateFactory = this._resolve.resolveComponentFactory(CreateComponent),
      createComponent = updateFactory.create(this._injector)

      swal({
        content: createComponent.location.nativeElement,
        icon: 'info',
        title: 'Create Employee Info',
        buttons: {}
      })
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

  onDelete(user_id, emp_name) {
    const deleteFactory = this._resolve.resolveComponentFactory(DeleteComponent),
      deleteComponent = deleteFactory.create(this._injector)

      deleteComponent.instance.user_id = user_id
      deleteComponent.instance.emp_name = emp_name
      deleteComponent.changeDetectorRef.detectChanges()

      swal({
        content: deleteComponent.location.nativeElement,
        icon: 'info',
        title: 'Delete Employee Info',
        buttons: {}
      })
  }

  logOut() {
    localStorage.removeItem('token')
    location.reload()
  }
}
