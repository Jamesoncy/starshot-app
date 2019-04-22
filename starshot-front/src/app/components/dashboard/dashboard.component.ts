import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  @Input() appTitle: string;
  constructor() { }

  getEmployees() {}
}
