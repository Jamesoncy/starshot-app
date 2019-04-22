import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import * as swal from 'sweetalert';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetectChange {

  constructor(private _reference) {
  }

  onSearchChange() {
    console.log('Change Detected')
    this._reference.detectChanges()
  }

  errorHandler(error: HttpErrorResponse) {
    console.log(error)
    swal(`hey`)
  }
}
