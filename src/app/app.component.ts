import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { SvgIconComponent, SvgIconRegistryService } from 'angular-svg-icon';

import { appIconsMap } from './app-icons-map';
import { AsideComponent } from './components/aside/aside.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsideComponent,
    RouterLink,
    RouterOutlet,
    SvgIconComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private registry: SvgIconRegistryService) {}

  ngOnInit() {
    this.registerIcons();
  }

  private registerIcons(): void {
    for (const [name, data] of appIconsMap.entries()) {
      this.registry.addSvg(name, data);
    }
  }
}
