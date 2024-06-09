import { Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { PageComponent } from './views/page/page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'ngrx',
    component: PageComponent,
  },
  {
    path: 'jasmine',
    component: PageComponent,
  },
  {
    path: 'cypress',
    component: PageComponent,
  },
  { path: '**', redirectTo: '' },
];
