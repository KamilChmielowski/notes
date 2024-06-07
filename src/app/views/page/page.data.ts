export const pages = new Map([
  ['ngrx', [
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
  ]],
  ['jasmine', [
    {
      p: 'Basic test',
      code: `describe('Name', () => {
    it('should add two number', () => {

        pending(); // if not finished

        const result = calculator.add(2, 2);
        expect(result).toBe(4, 'unexpected add result')
    });
});`,
    },
    {
      p: 'Create spy object',
      code: `describe('Name', () => {
    it('should add two number', () => {

        // const service1 = new Service1();
        // spyOn(service1, 'methodName');

        const service1 = jasmine.createSpyObj('Service1', ['methodName']) // fake implementation
        service1.methodName.and.returnValue();

        const service2 = new Service2(service1); // service2 uses method from service1

        expect(service.methodName).toHaveBeenCalledTimes(1); // call only once to pass
    });
});
`,
    },
    {
      p: 'Before each block',
      code: `describe('Name', () => {
    let serviceSpy: any;

    beforeEach(() => {
        serviceSpy = jasmine.createSpyObj('Service',  ['method']);
    });

    it('should add two number', () => { expect(serviceSpy.method).toHaveBeenCalledTimes(1); });
    it('should add subtract number', () => { expect(serviceSpy.method).toHaveBeenCalledTimes(1); });
});`,
    },
    {
      p: 'Service injection',
      code: `coursesService = TestBed.inject(CoursesService)\t\t// nowe API
coursesService = TestBed.get(CoursesService)\t\t// stare API

describe('Name', () => {
    let serviceSpy: any = jasmine.createSpyObj('Service', ['method']);
    let service2: Service2;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                Service2,
                { provide: Service1, useValue: serviceSpy }
            ]
        });
        service2 = TestBed.inject(Service2);
    });

    it('should add two number', () => { const result = calculator.add(2, 2); });
    it('should add subtract number', () => { const result = calculator.subtract(2, 2); });
});`,
    },
    {
      p: 'Turn off, focus on test',
      code: `xdescribe('Name', () => {            // turn off
    xit('should add two number', () => {});
});

fdescribe('Name', () => {           // focus on
    fit('should add two number', () => {});
});`,
    },
    {
      p: 'Test method call in component',
      code: `it('should call service to fetch current year', () => {
    const userServiceSpy = spyOn(currentYearService, 'getCurrentYear').and.callThrough();
    spyOn(component, 'ngOnInit').and.callThrough();

    expect(userServiceSpy).not.toHaveBeenCalled();
    component.ngOnInit();
    expect(userServiceSpy).toHaveBeenCalledTimes(1);
});
 `,
    },
    {
      p: 'Test HTTP requests',
      code: `describe('Name', () => {           // spy service - no need real request
    let service: MyApiService,
    httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule           // provides get, post, put...
            ],
            providers: [
                MyApiService,
            ],
        });
        service = TestBed.inject(MyApiService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should retrieve data', () => {
        service.fetch().subscribe(data => {
            expect(data).toBeTruthy('No data returned.');
        });

        const req = httpTestingController.expectOne('/api/data');

        expect(req.request.method).toEqual('GET');

        req.flush({}); // pass mock data and simulate request\t\t
    });

    afterEach(() => {
        httpTestingController.verify();
    });
});`,
    },
    {
      p: 'Pass data in HTTP method',
      code: `let serviceSpy: any;

beforeEach(() => {
    serviceSpy = jasmine.createSpyObj('Service', ['fetchData']);
});

it('...', () => {
    serviceSpy.fetchData.and.returnValue(of(myData));
});`,
    },
    {
      p: 'Test HTTP PUT requests',
      code: `it('should save data', () => {
    const data: { title: 'title' };

    service.save(1, data).subscribe(newData => {
        expect(data.id).toBe(1);
    });

    const req = httpTestingController.expendOne('/api/data/1');

    expect(req.request.method).toEqual("PUT");

    expect(req.request.body.title).toEqual(data.title);

    req.flush({
        id: 1,
        title: 'title'
    });
});`,
    },
    {
      p: 'HTTP error handle',
      code: `it('should give an error if save fails', () => {
    const data: { title: 'title' };

    service.save(1, data).subscribe(
        () => fail("The save operation should have failed.")
        (error: HttpErrorResponse) => {
            export(error.status).toBe(500);
        }
    );

    const req = httpTestingController.expendOne('/api/data/1');

    expect(req.request.method).toEqual("PUT");

    req.flush('Save failed.', { status: 500, statusText: 'Internal Server Error.' });
});`,
    },
    {
      p: 'Test Angular component',
      code: `describe('Name', () => {
    let component: ComponentName;
    let fixture: ComponentFixture<ComponentName>;
    let el: DebugElement;

    beforeEach(waitForAsync(() => { // each it should wait for fixture and component instances
        TestBed.configureTestingModule({
            import: [ModuleName],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(ComponentName);
            component = fixture.componentInstance;
            el = fixture.debugElement;
        });
    }));

    it('...', () => {});
});`,
    },
    {
      p: 'DOM interactions',
      code: `describe('Name', () => {

    it('should display elements', () => {
        component.elements = getElementsMock();
        fixture.detectChanges();

        const elements = el.queryAll(By.css('.class-name'));

        const element = el.query(By.css('class-name:first-child'));
        const insideElement = element.query(By.css('.inside-class-name'));

        expect(elements).toBeTruthy('Could not find elements);
    });
});`,
      language: 'ts'
    },
    {
      p: 'Smart components',
      code: `describe('Name', () => {

    it('should display elements', () => {
        component.elements = getElementsMock();
        fixture.detectChanges();

        const elements = el.queryAll(By.css('.class-name'));

        const element = el.query(By.css('class-name:first-child'));
        const insideElement = element.query(By.css('.inside-class-name'));

        expect(elements).toBeTruthy('Could not find elements);
    });
});`,
      language: 'ts'
    },
    {
      p: 'Asynchronous - done (expect inside timeout block)',
      code: `it('...', (done: DoneFn) => {
    const tabs = el.queryAll(By.css('.mat-tab-label'));
    tabs.nativeElement.click();
    fixture.detectChanges();

    setTimeout(() => {
        expect('...');
        done();
    }, 500);
});`,
    },
    {
      p: 'Asynchronous - fake async (expect outside timeout block)',
      code: `it('...', fakeAsync(() => {
    const tabs = el.queryAll(By.css('.mat-tab-label'));
    tabs.nativeElement.click();
    fixture.detectChanges();

    setTimeout(() => {}, 500);

    tick(500);            // wait time manually

    expect('...');
}));

it('...', fakeAsync(() => {
    const tabs = el.queryAll(By.css('.mat-tab-label'));
    tabs.nativeElement.click();
    fixture.detectChanges();

    setTimeout(() => {}, 750);
    setTimeout(() => {}, 500);

    flush();            // wait for all timeout

    expect('...');
}));`,
    },
    {
      p: 'Microtasks: promise-based code',
      code: `// TASK (MACROTASK) - setTimeout()
// MICROTASK - Promise

it('...', fakeAsync(() => {
    Promise.resolve().then(() => {

    });

    flushMicrotask();

    expect('...');
}));`,
    },
    {
      p: 'Wait for async (real HTTP call)',
      code: `it('...', waitForAsync(() => {

    fixture.detectChanges();

    fixture.whenStable().then(() => {
        expect('...');
    });
}));`,
    },
    {
      p: 'Test scripts',
      code: `ng test --no-watch

ng test --watch=false --code-coverage
cd coverage/`,
      fileName: 'CLI'
    }
  ]],
]);
