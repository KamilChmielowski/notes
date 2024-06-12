import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
  RoutesRecognized
} from '@angular/router';
import { AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, inject, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { filter, map } from 'rxjs';
import 'highlight.js/styles/an-old-hope.css';
// import 'highlight.js/styles/atom-one-dark.min.css';
// import 'highlight.js/styles/atom-one-dark-reasonable.min.css';
// import 'highlight.js/styles/github-dark.min.css';
import { SvgIconComponent, SvgIconRegistryService } from 'angular-svg-icon';

import { appIconsMap } from './app-icons-map';
import { AsideComponent } from './components/aside/aside.component';
import { DashCase } from './views/page/page.pipe';
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
export class AppComponent implements OnInit, AfterViewInit {
  @HostBinding('class.homepage') protected isHome = false;

  private highlightLoaded = false;

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly document = inject(DOCUMENT);
  private readonly registry = inject(SvgIconRegistryService);
  private readonly router= inject(Router);

  constructor() {
    this.observeRouterEvents();
  }

  ngOnInit() {
    this.registerIcons();
  }

  ngAfterViewInit() {
    this.activatedRoute.fragment.subscribe(fragment => {
      if (!fragment) {
        return
      }
      setTimeout(() => {
        const element = this.document
          .querySelector(`#${DashCase.toDashCase(fragment)}`);

        if (element) {
          this.highlightLoaded = true;
          element.scrollIntoView();
        }
      }, this.highlightLoaded ? 0 : 500);
    });
  }

  private observeRouterEvents(): void {
    this.router.events.pipe(
      filter(val => val instanceof NavigationEnd),
      map(val => val as RoutesRecognized),
    ).subscribe((val) => this.isHome = val.urlAfterRedirects === '/');
  }

  private registerIcons(): void {
    for (const [name, data] of appIconsMap.entries()) {
      this.registry.addSvg(name, data);
    }
  }
}
