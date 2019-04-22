import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter  } from '@angular/core';
import { DetectChange } from '../detect-change.component';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import * as swal from 'sweetalert';

interface Result {
  result: boolean
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends DetectChange {
  username: string;
  password: string

  @Output() childEvent = new EventEmitter()
  constructor(private _ref: ChangeDetectorRef, private _service: UserService) {
    super(_ref)
  }

  onValidate(): any {
    return new Observable(observer => {
      this._service.login(this.username, this.password).subscribe(
        ({ message, data}) => {
          swal(`Success`, message, `success`)
          localStorage.setItem('token', data.token)
          observer.next(true)
        },
        (err) => this.errorHandler(err, () => observer.next(false))
      )
    })
  }
}
