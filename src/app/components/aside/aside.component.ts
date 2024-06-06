import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { SvgIconComponent } from 'angular-svg-icon';
import { IconLinkComponent } from './icon-link/icon-link.component';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [
    SvgIconComponent,
    RouterLink,
    RouterLinkActive,
    IconLinkComponent,
  ],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideComponent {}
