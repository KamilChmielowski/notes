import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CodeComponent } from '../../components/code/code.component';
import { pages } from './page.data';

export interface CmsData {
  p?: string;
  ul?: string[];
  code?: string;
  fileName?: string;
  language?: string;
  noHeader?: boolean;
}

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CodeComponent, CommonModule,],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  protected readonly cms: WritableSignal<CmsData[]> = signal([]);

  constructor(private route: ActivatedRoute) {
    this.route.url.pipe(takeUntilDestroyed()).subscribe(urlSegment => {
      this.cms.set(pages.get(urlSegment[0].path) || []);
    });
  }
}
