import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideStore } from '@ngxs/store';
import { GameState } from './store/game.state';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideStore([GameState])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'star-wars-game' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('star-wars-game');
  });

  it(`should have the 'newGame' method`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.newGame).toBeTruthy();
  });

  it(`should have the 'nextTurn' method`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.nextTurn).toBeTruthy();
  });

  it(`should have the 'setCardsType' method`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.setCardsType).toBeTruthy();
  });

  it(`should have the 'ngOnInit' method`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.ngOnInit).toBeTruthy();
  });
});
