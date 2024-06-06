import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeComponent } from '../../components/code/code.component';

export interface CmsData {
  p: WritableSignal<string>;
  code: WritableSignal<string>;
}

@Component({
  selector: 'app-ngrx',
  standalone: true,
  imports: [CodeComponent, CommonModule,],
  templateUrl: './ngrx.component.html',
  styleUrl: './ngrx.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgrxComponent {
  protected readonly cms: CmsData[] = [
    {
      p: signal('Create reducer:'),
      code: signal(`import { createReducer } from '@ngrx/store';

const initialState = 0;

export const valueReducer = createReducer(initialState);`),
    },
    {
      p: signal('Register reducer:'),
      code: signal(`bootstrapApplication(AppComponent, {
    providers: [provideStore({
        value: valueReducer
    })]
});`),
    },
    {
      p: signal('Read value in component:'),
      code: signal(`export class AppComponent {
    value$: Observable<number>;

    constructor(private store: Store<{ value: number }>) {
        this.value$ = store.select('value');
    }
}`),
    },
    {
      p: signal('Display value in template:'),
      code: signal(`<p>{{ value$ | async }}</p>`),
    },
  ];
}
