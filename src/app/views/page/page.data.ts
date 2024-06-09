import { CmsData } from './page.component';

export const pages = new Map<string, CmsData[]>([
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
  ['cypress', [
    {
      p: 'Cypress scripts',
      code: `"cypress:open": "cypress open"
"cypress:run": "cypress run"`,
      fileName: 'CLI',
    },
    {
      p: 'Provide typing',
      code: `/// <reference types="Cypress" />`,
    },
    {
      p: 'Should examples',
      code: `cy.visit('/');

cy.get('.class').contains('Text');

cy.get([data-cy="element"]).should('have.length', 5);
cy.get([data-cy="element"]).should('have.attr', 'disabled');
cy.get([data-cy="element"]).should('exist');
cy.get([data-cy="element"]).should('not.exist');
cy.get([data-cy="element"]).should('have.attr', 'class').should('match', /invalid/);
cy.get([data-cy="element"]).should('have.class', 'visible');
cy.get([data-cy="element"]).should('be.visible');
cy.get([data-cy="element"]).first();
cy.get([data-cy="element"]).last();
cy.get([data-cy="element"]).eq(5);    // 5-th element
cy.get([data-cy="element"]).parent();
cy.get([data-cy="element"]).children();`,
    },
    {
      p: 'Check CSS styles',
      code: `cy.get('body').should('have.css', 'background-color', 'rgb(0, 0, 0)');`,
    },
    {
      p: 'Add aliases for elements',
      code: `cy.get([data-cy="element"]).as('myElement');
cy('@myElement')
    .should('have.length', 5)
    .should('have.attr', 'disabled');`,
      language: 'ts'
    },
    {
      p: 'Search nested elements',
      code: `cy.get('.outer-class .inner-class');
cy.get('.outer-class').find('.inner-class');`,
    },
    {
      code: `<element data-cy="selector-for-cy"></element>      // recommended way`,
      language: 'html'
    },
    {
      code: `cy.get('[data-cy="selector-for-cy"]');`,
    },
    {
      p: 'User interactions',
      code: `cy.get('button').click();
cy.get('button').click({ force: true });    // force when element is obscured

cy.get('input').type('New content');

cy.get('dropdown').select('value');`,
    },
    {
      p: 'Navigation',
      code: `cy.location('pathname').should('eq', '/home');

cy.go('back');
cy.go('forward');`,
    },
    {
      p: 'Element access',
      code: `// avoid then: cy.get([data-cy="element"]).then(el => {});

cy.get([data-cy="element"]).should(el => {
    expect(el.attr('disabled')).to.be.undefined;
    expect(el).to.not.have.attr('disabled ');
    expect(el.text()).to.be('Text');
    expect(el[0].text()).to.be('Text');
});`,
    },
    {
      p: 'Keyboard events',
      code: `cy.get([data-cy="element"]).type('test@example.com{enter} ');`,
    },
    {
      p: 'Configuration',
      code: `export default defaultConfig({
    e2e: {
        baseUrl: 'http://localhost:4200',
        setupNodeEvents(on, config) {

        },
    },
});

cy.visit('/home') \t\t// redirect to 'http://localhost:4200/home'`,
      fileName: ' cypress.config.js'
    },
    {
      p: 'Test hooks',
      code: `describe('...', () => {
    before(() => {
        // only once
    });

    beforeEach(() => {
        // before every test
    });

    afterEach(() => {
        // after every test
    });

    after(() => {
        // after all tests
    });
});`,
    },
    {
      p: 'Custom commands',
      code: `Cypress.Commands.add('submitForm', () => {
    cy.get('form button[type="submit"]').click();
});

cy.submitForm();`,
    },
    {
      p: 'Custom queries',
      code: `Cypress.Commands.addQuery('getById', (id) => {
    const getFn = cy.now('get', \`[data-cy="\${id}"]\`);
    return () => {
        return getFn();
    }
});`,
      fileName: 'cypress/support/commands.js'
    },
    {
      p: 'Tasks',
      code: `export default defaultConfig({
    e2e: {
        setupNodeEvents(on, config) {
            on('task', {
                seedDatabase(filename) {
                    // run your NodeJS code e.g. edit a file
                    // run outside the browser
                    return filename;
                }
            });
        },
    },
});`,
    },
    {
      code: `it('...', () => {
    cy.task('seedDatabase', 'filename.csv').then(value => {

    });
});`,
    },
    {
      p: 'Stubs (method replacement)',
      code: `it('...', () => {
    cy.stub(window.navigator.geolocation, 'getCurrentPosition');    // window not available here

    cy.visit('/').then(win => {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').as('getPos');    // window available here
    });

    cy.get('@getPos').should('have.been.called');
});`,
    },
    {
      p: 'Fake stub implementation',
      code: `it('...', () => {
    cy.visit('/').then(win => {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').as('getPos');
    }).callsFake(cb => {
        setTimeout(() => {
            cb({
                data: myData
            })
        }, 100);
    });
});`,
    },
    {
      p: 'Fake stub return value',
      code: `it('...', () => {
    cy.stub(win.navigator.clipboard, 'writeText').as('saveToClipboard').resolves();
});`,
    },
    {
      p: 'Stub arguments',
      code: `it('...', () => {
    cy.get('@saveToClipboard').should('have.been.calledWithMatch', 'some-string-data');
});
`,
    },
    {
      p: 'Fixtures',
      code: `cy.fixture('data.json').as('data');

cy.get('@data').then(data => {

});`,
      fileName: 'fixtures/data.json'
    },
    {
      p: 'Spies: listener for function',
      code: `cy.visit('/').then(win => {
    cy.spy(win.localStorage, 'setItem').as('storeData');
    cy.spy(win.localStorage, 'getItem').as('getStoredData');

    cy.get('@storeData').should('have.been.calledWithMatch', /John Doe/, new RegExp('...'));
});`,
    },
    {
      p: 'Manipulating the clock',
      code: `cy.clock();
cy.tick(2000);`,
    },
    {
      p: 'Setup node events',
      code: `export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            on('task' {
                async seedDatabase() {
                    await seedDatabaseLogin()
                    return null;    // must be return value
                }
            })
        }
    }
});`,
    },
    {
      code: `beforeEach(() => {
    cy.task('seedDatabase');
});`,
    },
    {
      p: 'Interceptors',
      code: `// localhost:4200/my-endpoint?anything
cy.intercept('/my-endpoint*');

// POST localhost:4200/my-endpoint?anything
cy.intercept('POST', '/my-endpoint*');

 // real request blocked, take stub object
cy.intercept('POST', '/my-endpoint*', { status: 201 }).as('subscribe');

cy.wait('@subscribe');`,
    },
    {
      p: 'Test request',
      code: `cy.request({
    method: 'POST',
    url: '/newsletter',
    body: { email: 'test@example.com' }
}).then(res => {
    expect(res.status).to.eq(201);
});`,
    },
    {
      p: 'Dealing with network request'
    },
    {
      p: '1. Allow',
      noHeader: true
    },
    {
      ul: [
        `let the website do its requests`,
        `use a separate testing database to keep test isolation`
      ],
      noHeader: true
    },
    {
      p: '2. Intercept',
      noHeader: true
    },
    {
      ul: [
        `with spy (request passes & you can spy on it)`,
        `with stub (request is blocked & stub response is used)`
      ],
      noHeader: true
    },
    {
      p: '3. Trigger manually',
      noHeader: true
    },
    {
      ul: [
        `test API endpoints from inside your tests`,
        `decoupling front and backend`
      ],
      noHeader: true
    }
  ]]
]);
