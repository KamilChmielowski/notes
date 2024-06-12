import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private visible = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  show(): void {
    if (this.visible) {
      return;
    }
    this.document.querySelector('#snackbar')?.classList.add('show');
    this.visible = true;

    setTimeout(() => {
      this.document.querySelector('#snackbar')?.classList.remove('show');
      setTimeout(() => this.visible = false, 300);
    }, 2000);
  }
}
