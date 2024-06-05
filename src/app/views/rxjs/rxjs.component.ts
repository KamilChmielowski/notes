import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-rxjs',
  standalone: true,
  imports: [],
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxjsComponent {

}
