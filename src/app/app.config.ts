import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { provideAngularSvgIcon } from 'angular-svg-icon';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAngularSvgIcon(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
  ]
};
