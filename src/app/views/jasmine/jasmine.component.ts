import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-jasmine',
  standalone: true,
  imports: [],
  templateUrl: './jasmine.component.html',
  styleUrl: './jasmine.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JasmineComponent {

}
