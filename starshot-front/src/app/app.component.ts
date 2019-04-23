import { Component, OnInit, ComponentFactoryResolver, Injector } from '@angular/core';
import { LoginComponent } from './components/login/login.component';

import * as swal from 'sweetalert';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'starshot-app';
  message = '';

  eventsSubject: Subject <void> = new Subject()

  constructor(private _resolve: ComponentFactoryResolver, private _injector: Injector) {
  }

  ngOnInit() {
    this.loginForm()
  }

  loginForm() {
    let loginFactory = this._resolve.resolveComponentFactory(LoginComponent),
      loginComponent = loginFactory.create(this._injector);

      const loginForm = () => swal({
        content: loginComponent.location.nativeElement,
        closeOnClickOutside: false,
        icon: 'info',
        title: 'Login'
      }).then(() => {
        loginComponent.instance.onValidate().subscribe(
          (data: Boolean) => {
            if (!data) {
              loginForm()
            } else {
              loginComponent.destroy()
              this.eventsSubject.next()
            }
          }
        )
      });

    if (localStorage.getItem('token')) {
      swal(`Info`, 'Already Logged in..!', 'info').then(() => {
        this.eventsSubject.next()
      })
    } else {
      loginForm()
    }
  }


  storeToken(token) {
    localStorage.setItem('token', JSON.stringify(token))
  }
}
