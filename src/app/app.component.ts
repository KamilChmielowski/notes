import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SvgIconRegistryService } from 'angular-svg-icon';

import { appIconsMap } from './app-icons-map';
import { AsideComponent } from './components/aside/aside.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsideComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private registry: SvgIconRegistryService,) {
  }

  ngOnInit() {
    this.registerIcons();
  }
  private registerIcons(): void {
    for (const [name, data] of appIconsMap.entries()) {
      this.registry.addSvg(name, data);
    }
  }
}
