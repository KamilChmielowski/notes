import { Routes } from '@angular/router';

import { AngularComponent } from './views/angular/angular.component';
import { JasmineComponent } from './views/jasmine/jasmine.component';
import { HomeComponent } from './views/home/home.component';
import { NgrxComponent } from './views/ngrx/ngrx.component';
import { RxjsComponent } from './views/rxjs/rxjs.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { animation: 'HomePage' }
  },
  {
    path: 'angular',
    component: AngularComponent,
    data: { animation: 'AngularPage' }
  },
  {
    path: 'jasmine',
    component: JasmineComponent,
    data: { animation: 'JasminePage' }
  },
  {
    path: 'ngrx',
    component: NgrxComponent,
    data: { animation: 'NgRxPage' }
  },
  {
    path: 'rxjs',
    component: RxjsComponent,
    data: { animation: 'RxjsPage' }
  },
  { path: '**', redirectTo: '' },
];
