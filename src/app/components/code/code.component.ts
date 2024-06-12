import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { Highlight, HighlightAuto } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';

import 'highlight.js/styles/an-old-hope.css';
import { SvgIconComponent } from 'angular-svg-icon';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
// import 'highlight.js/styles/atom-one-dark.min.css';
// import 'highlight.js/styles/atom-one-dark-reasonable.min.css';
// import 'highlight.js/styles/github-dark.min.css';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [
    ClipboardModule,
    HighlightAuto,
    HighlightLineNumbers,
    Highlight,
    SvgIconComponent,
  ],
  templateUrl: './code.component.html',
  styleUrl: './code.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeComponent {
  readonly code = input.required<string>();
  readonly fileName = input<string>();
  readonly language = input<string>();

  protected readonly snackbarService = inject(SnackbarService);
}
