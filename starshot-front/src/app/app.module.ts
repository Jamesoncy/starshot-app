import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';

import { UserService } from './services/user.service';
import { EmployeeService } from './services/employee.service';
import { UpdateComponent } from './components/employee/update/update.component';
import { CreateComponent } from './components/employee/create/create.component';
import { DeleteComponent } from './components/employee/delete/delete.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    UpdateComponent,
    CreateComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbPaginationModule,
    
    UserService,
    EmployeeService
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, DashboardComponent, CreateComponent, UpdateComponent, DeleteComponent]
})
export class AppModule { }
