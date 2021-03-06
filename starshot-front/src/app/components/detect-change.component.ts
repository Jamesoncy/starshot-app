import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import * as swal from 'sweetalert';
import { upperFirst } from 'lodash';

export class DetectChange {
  swal

  constructor(private _reference) {
    this.swal = swal
  }

  onSearchChange() {
    this._reference.detectChanges()
  }

  errorHandler(error: HttpErrorResponse, fn = null) {
    const { error: { message } } = error
    swal(`Oops..!`, upperFirst(message), `error`).then(() => {
      if (fn !== null) {
        return fn()
      }
    })
  }

  swalClose() {
    this.swal.close()
  }
}
