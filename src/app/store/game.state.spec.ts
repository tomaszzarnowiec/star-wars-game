import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { GameState } from './game.state';
import { GameActions } from './game.actions';
import {
  initialGameState,
  CARD_TYPE,
  People,
  Cards,
  Starship,
} from './game.model';
import { GameService } from '../services/game.service';
import { lastValueFrom } from 'rxjs';
import _ from 'lodash';

// Mock GameService
class MockGameService {
  compareCards = jasmine.createSpy('compareCards').and.returnValue(1);
  getCards = jasmine.createSpy('getCards').and.callFake((type: string) => {
    if (type === CARD_TYPE.PEOPLE) {
      return Promise.resolve({
        player1: {
          ...new People(),
          name: 'Luke Skywalker',
          mass: '85,000',
        } as People,
        player2: {
          ...new People(),
          name: 'Darth Vader',
          mass: '75,000',
        } as People,
      });
    } else if (type === CARD_TYPE.STARSHIPS) {
      return Promise.resolve({
        player1: {
          ...new Starship(),
          name: 'Death Star',
          crew: '342,953',
        } as Starship,
        player2: {
          ...new Starship(),
          name: 'Millennium Falcon',
          crew: '4',
        } as Starship,
      });
    } else {
      return Promise.resolve({
        player1: null,
        player2: null,
      });
    }
  });
}

describe('GameState', () => {
  let store: Store;
  let gameService: MockGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([GameState])],
      providers: [{ provide: GameService, useClass: MockGameService }],
    });

    store = TestBed.inject(Store);
    gameService = TestBed.inject(GameService) as unknown as MockGameService;
    store.reset({ game: initialGameState });
  });

  it('should set cards and determine winner', async () => {
    const cards = {
      player1: { ...new People(), name: 'Luke Skywalker', mass: '85,000' },
      player2: { ...new People(), name: 'Darth Vader', mass: '75,000' },
    } as Cards;

    await lastValueFrom(store.dispatch(new GameActions.SetCards(cards)));

    const cardsSnap = store.selectSnapshot(GameState.getCards);
    const winnerSnap = store.selectSnapshot(GameState.getWinner);

    expect(gameService.compareCards).toHaveBeenCalledWith(
      cards,
      initialGameState.cardsType
    );
    expect(cardsSnap).toEqual(cards);
    expect(winnerSnap).toBe(1);
  });

  it('should set cards type', () => {
    const cardsType = CARD_TYPE.STARSHIPS;
    store.dispatch(new GameActions.SetCardsType(cardsType));

    const cardsTypeSnap = store.selectSnapshot(GameState.getCardsType);
    expect(cardsTypeSnap).toBe(cardsType);
  });

  it('should increase player score', () => {
    store.dispatch(new GameActions.IncreasePlayerScore(1));

    const scoreSnap = store.selectSnapshot(GameState.getScore);
    expect(scoreSnap.player1).toBe(1);
    expect(scoreSnap.player2).toBe(0);
  });

  it('should start a new game', () => {
    store.dispatch(new GameActions.NewGame());

    const scoreSnap = store.selectSnapshot(GameState.getScore);
    expect(scoreSnap.player1).toBe(0);
    expect(scoreSnap.player2).toBe(0);
  });

  it('should handle next turn and request cards', async () => {
    await lastValueFrom(
      store.dispatch(new GameActions.NextTurn(CARD_TYPE.PEOPLE))
    );

    const winnerSnap = store.selectSnapshot(GameState.getWinner);
    const winner = _.some([0, 1, 2], (val) => val === winnerSnap);
    expect(winner).toBeTrue();

    expect(gameService.getCards).toHaveBeenCalledWith(CARD_TYPE.PEOPLE);
  });
});
