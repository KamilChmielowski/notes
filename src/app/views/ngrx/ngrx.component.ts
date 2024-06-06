import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { CodeComponent } from '../../components/code/code.component';

@Component({
  selector: 'app-ngrx',
  standalone: true,
  imports: [CodeComponent],
  templateUrl: './ngrx.component.html',
  styleUrl: './ngrx.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgrxComponent {
  code1 = signal(`export class AppComponent implements OnInit {
  constructor(private registry: SvgIconRegistryService) {}

  ngOnInit() {
    this.registerIcons();
  }

  private registerIcons(): void {
    for (const [name, data] of appIconsMap.entries()) {
      this.registry.addSvg(name, data);
    }
  }
}`);
}
