import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { provideAngularSvgIcon } from 'angular-svg-icon';
import { provideHighlightOptions } from 'ngx-highlightjs';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAngularSvgIcon(),
    provideAnimations(),
    provideExperimentalZonelessChangeDetection(),
    provideHighlightOptions({
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
      languages: {
        typescript: () => import('highlight.js/lib/languages/typescript'),
        javascript: () => import('highlight.js/lib/languages/javascript'),
        xml: () => import('highlight.js/lib/languages/xml'),
        css: () => import('highlight.js/lib/languages/css'),
        scss: () => import('highlight.js/lib/languages/scss'),
      }
    }),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
  ]
};
