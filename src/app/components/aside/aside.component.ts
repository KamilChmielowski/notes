import { Component } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [
    SvgIconComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent {

}
