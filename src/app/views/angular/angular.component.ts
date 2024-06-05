import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-angular',
  standalone: true,
  imports: [],
  templateUrl: './angular.component.html',
  styleUrl: './angular.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularComponent {

}
