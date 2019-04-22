import { Component, ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { DetectChange } from '../detect-change.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends DetectChange {
  username: string;
  password: string

  constructor(private _ref: ChangeDetectorRef) {
    super(_ref)
  }

  onValidate() {
    
  }

}
