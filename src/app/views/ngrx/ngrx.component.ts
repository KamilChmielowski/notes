import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeComponent } from '../../components/code/code.component';

export interface CmsData {
  p?: string;
  code: string;
  fileName?: string;
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
  protected readonly cms: WritableSignal<CmsData[]> = signal([
    {
      p: 'Create reducer',
      code: `import { createReducer } from '@ngrx/store';

const initialState = 0;

export const valueReducer = createReducer(initialState);`,
      fileName: 'app.reducer.ts',
    },
    {
      p: 'Register reducer',
      code: `import { provideStore } from '@ngrx/store';

import { valueReducer } from './store/app/app.reducers';

bootstrapApplication(AppComponent, {
    providers: [provideStore({
        value: valueReducer
    })]
});`,
      fileName: 'app.config.ts',
    },
    {
      p: 'Assign alias to value',
      code: `import { Store } from '@ngrx/store';

export class AppComponent {
    value$: Observable<number>;

    constructor(private store: Store<{ value: number }>) {
        this.value$ = store.select('value');
    }
}`,
      fileName: 'app.component.ts',
    },
    {
      p: 'Display value in template',
      code: `<p>{{ value$ | async }}</p>`,
      fileName: 'app.component.html',
    },
    {
      p: 'Create actions to state changing',
      code: `import { createAction } from '@ngrx/store';

export const increment = createAction('[App] Increment'); // conventional
export const decrement = createAction('[App] Decrement');`,
      fileName: 'app.actions.ts',
    },
    {
      p: 'Assign action to reducer',
      code: `import { createReducer, on } from '@ngrx/store';

import { increment, decrement } from './app.actions';

const initialState = 0;

const appReducer = createReducer(
    initialState,
    on(increment, (state) => state + 1),
    on(decrement, (state) => state - 1)
);`,
      fileName: 'app.reducer.ts',
    },
    {
      p: 'Dispatch actions',
      code: `import { increment, decrement } from '../store/app.actions';

export class AppComponent {
    constructor(private store: Store) {}

    increment() {
        this.store.dispatch(increment()); // execute action
    }

    decrement() {
        this.store.dispatch(decrement());
    }
}`,
      fileName: 'app.component.ts',
    },
    {
      p: 'Pass props to actions',
      code: `import { createAction, props } from '@ngrx/store';

export const setValue = createAction(
    '[App] Set value',
    props<{ value: number }>(),
);

export const addToValue = createAction(
    '[App] Add to value',
    props<{ value: number }>(),
);`,
      fileName: 'app.actions.ts',
    },
    {
      code: `import { createReducer, on } from '@ngrx/store';

import { addToValue, setValue } from './app.actions';

const initialState = 0;

export const valueReducer = createReducer(
    initialState,
    on(setValue, (state, actions) => actions.value),
    on(addToValue, (state, actions) => state + actions.value),
);`,
      fileName: 'app.reducer.ts',
    },
    {
      code: `import { Store } from '@ngrx/store';

import { setValue } from './store/app/app.actions';

export class AppComponent {
    constructor(private store: Store) {}

    setValue(value: number) {
        this.store.dispatch(setValue({ value }));
    }
}`,
      fileName: 'app.component.ts',
    },
    {
      p: 'Create selectors',
      code: `import { createSelector } from '@ngrx/store';

export const selectValue = (state: { value: number }) => state.value;
export const selectDoubleValue = (state: { value: number }) => state.value * 2;
export const selectDoubleValue2 = createSelector(
    selectValue,
    (state) => state * 2
);`,
      fileName: 'app.selectors.ts',
    },
    {
      p: '',
      code: `import { selectValue } from './store/app.selectors';

export class AppComponent {
    value$: Observable<number>;

    constructor(private store: Store<{ value: number }>) {
        this.value$ = store.select(selectValue);
    }
}`,
      fileName: 'app.component.ts',
    },
    {
      p: 'Reqister effects',
      code: `ng add @ngrx/effects`,
      fileName: 'CMD',
    },
    {
      code: `import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';

import { AppEffects } from './store/app/app.effects';
import { valueReducer } from './store/app/app.reducers';

export const appConfig: ApplicationConfig = {
    providers: [
        provideStore({
          value: valueReducer,
        }),
        provideEffects([
          AppEffects,
        ]),
    ]
};`,
      fileName: 'app.config.ts',
    },
    {
      p: 'Create effects',
      code: `import { Injectable } from '@angular/core';

import { Actions, createEffects, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs';

import { increment, decrement } from './app.actions';
import { selectValue } from './store/app.selectors';

@Injectable()
export class AppEffects {
    saveValue = createEffect(() => {
        return this.actions$.pipe(
            ofType(increment, decrement),
            withLatestFrom(this.store.select(selectValue))
            tap(([action, value]) => {
                console.log(action);
                localStorage.setItem('value', value.toString());
            }),
        )
    }, { dispatch: false });

    constructor(private actions$: Actions, private store: Store<{ value: number }>) {}
}
`,
      fileName: 'app.effects.ts',
    },
    {
      p: 'Action dispatching another action',
      code: `import { createAction } from '@ngrx/store';
import { createEffects, ofType } from '@ngrx/effects';
import { createReducer, on } from '@ngrx/store';

export const init = createAction('[App] Init');
export const set = createAction('[App] Set', props<{ value: number }>());

export const appReducer = createReducer(
    0, on(set, (state, action) => action.value),
);

@Injectable()
export class AppEffects {
    loadValue = createEffect(() => {    // calling init calls set (no init in reducer)
        return this.actions$.pipe(
            ofType(init),
            switchMap(() => {
                return of(
                    set({
                        value: localStorage.getItem('value') || 0
                    })
                );
            }),
        );
    });
}`,
      fileName: 'app.effects.ts',
    }
  ]);
}
