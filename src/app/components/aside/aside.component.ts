import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
  WritableSignal
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { SvgIconComponent } from 'angular-svg-icon';

import { IconLinkComponent } from './icon-link/icon-link.component';

interface IdText {
  id: string;
  text: string;
}

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [
    IconLinkComponent,
    RouterLink,
    RouterLinkActive,
    SvgIconComponent,
  ],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideComponent implements AfterViewInit {
  readonly baseUrl = input.required<string>();

  protected readonly uiElements: WritableSignal<IdText[]> = signal([]);

  private readonly document = inject(DOCUMENT);

  ngAfterViewInit(): void {
    this.updateNavigation();
  }

  private updateNavigation(): void {
    setTimeout(() => {
      this.uiElements.set(
        Array.from(this.document.querySelectorAll('h2'))
          .map(element => ({ id: element.id, text: element.textContent || '' }))
      );
    });
  }
}
