import { Component, OnInit, ComponentFactoryResolver, Injector } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import * as swal from 'sweetalert';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'starshot-app';
  message = '';

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
            }
          }
        )
      });

      loginForm()
  }
}
