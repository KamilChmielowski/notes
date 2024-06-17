import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
  RoutesRecognized
} from '@angular/router';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  HostBinding,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { filter, map } from 'rxjs';
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
  protected readonly baseUrl = signal('');
  protected readonly isHome = signal(false);

  @HostBinding('class.homepage') private homepage = false;

  private highlightLoaded = false;

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly document = inject(DOCUMENT);
  private readonly registry = inject(SvgIconRegistryService);
  private readonly router= inject(Router);

  constructor() {
    this.observeRouterEvents();

    const updateHomepageClass = effect(() => this.homepage = this.isHome());
  }

  ngOnInit() {
    this.registerIcons();
  }

  ngAfterViewInit() {
    this.observeFragmentChanges();
  }

  private observeFragmentChanges(): void {
    this.activatedRoute.fragment.subscribe(fragment => {
      if (!fragment) {
        return;
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
    ).subscribe((val) => {
      this.isHome.set(val.urlAfterRedirects === '/');
      this.baseUrl.set(val.urlAfterRedirects.split(/[?#]/)?.at(0) || '');
    });
  }

  private registerIcons(): void {
    for (const [name, data] of appIconsMap.entries()) {
      this.registry.addSvg(name, data);
    }
  }
}
