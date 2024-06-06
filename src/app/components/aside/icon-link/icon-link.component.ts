import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-icon-link',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    SvgIconComponent
  ],
  templateUrl: './icon-link.component.html',
  styleUrl: './icon-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconLinkComponent {
  readonly icon = input.required<string>();
  readonly name = input.required<string>();
}
