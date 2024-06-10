import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
  RoutesRecognized
} from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { filter, map } from 'rxjs';
import { SvgIconComponent, SvgIconRegistryService } from 'angular-svg-icon';

import { appIconsMap } from './app-icons-map';
import { AsideComponent } from './components/aside/aside.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsideComponent,
    RouterLink,
    RouterOutlet,
    SvgIconComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  @HostBinding('class.homepage') protected isHome = false;

  private observeRouterEvents(): void {
    this.router.events
      .pipe(
        takeUntilDestroyed(),
        filter(val => val instanceof NavigationEnd),
        map(val => val as RoutesRecognized),
      ).subscribe((val) => {
        this.isHome = val.urlAfterRedirects === '/';
    });
  }

  constructor(
    private registry: SvgIconRegistryService,
    private router: Router,
  ) {
    this.observeRouterEvents();
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
