import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';

import { UserService } from './services/user.service';
import { EmployeeService } from './services/employee.service';
import { UpdateComponent } from './components/employee/update/update.component';
import { DeleteComponent } from './components/employee/delete/delete.component';
import { CreateComponent } from './components/employee/create/create.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    UpdateComponent,
    DeleteComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    
    UserService,
    EmployeeService
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, DashboardComponent, UpdateComponent]
})
export class AppModule { }
