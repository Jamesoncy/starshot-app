import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import * as swal from 'sweetalert';

export class DetectChange {

  constructor(private _reference) {
  }

  onSearchChange() {
    this._reference.detectChanges()
  }

  errorHandler(error: HttpErrorResponse, fn = null) {
    const { error: { message } } = error
    swal(`Oops..!`, message, `error`).then(() => {
      if (fn !== null) {
        return fn()
      }
    })
  }
}
