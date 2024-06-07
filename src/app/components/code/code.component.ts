import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Highlight, HighlightAuto } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';

import 'highlight.js/styles/an-old-hope.css';
// import 'highlight.js/styles/atom-one-dark.min.css';
// import 'highlight.js/styles/atom-one-dark-reasonable.min.css';
// import 'highlight.js/styles/github-dark.min.css';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [
    HighlightAuto,
    HighlightLineNumbers,
    Highlight,
  ],
  templateUrl: './code.component.html',
  styleUrl: './code.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeComponent {
  readonly code = input.required<string>();
  readonly fileName = input<string>();
  readonly language = input<string>();
}
