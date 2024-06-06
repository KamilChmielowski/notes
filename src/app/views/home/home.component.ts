import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconLinkComponent } from '../../components/aside/icon-link/icon-link.component';

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        IconLinkComponent
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

}
