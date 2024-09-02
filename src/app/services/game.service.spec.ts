import { TestBed } from '@angular/core/testing';
import { Cards, CARD_TYPE, People, Starship } from '../store/game.model';
import { GameService } from './game.service';

describe('GameService', () => {
  let gameService: GameService;
  let testingCards: Cards = {
    player1: new People(),
    player2: new People(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameService],
    });
    gameService = TestBed.inject(GameService);
  });

  it('should compare cards and return the correct winner - people 1', () => {
    const cards: Cards = {
      player1: {
        ...testingCards.player1,
        mass: '85,000',
      } as People,
      player2: {
        ...testingCards.player2,
        mass: '75,000',
      } as People,
    };
    const cardsType: CARD_TYPE = CARD_TYPE.PEOPLE;

    const winner = gameService.compareCards(cards, cardsType);

    expect(winner).toBe(1);
  });

  it('should compare cards and return the correct winner - people 2', () => {
    const cards: Cards = {
      player1: {
        ...testingCards.player1,
        mass: '75,000',
      } as People,
      player2: {
        ...testingCards.player2,
        mass: '85,000',
      } as People,
    };
    const cardsType: CARD_TYPE = CARD_TYPE.PEOPLE;

    const winner = gameService.compareCards(cards, cardsType);

    expect(winner).toBe(2);
  });

  it('should compare cards and return the correct winner - people draw', () => {
    const cards: Cards = {
      player1: {
        ...testingCards.player1,
        mass: '75,000',
      } as People,
      player2: {
        ...testingCards.player2,
        mass: '75,000',
      } as People,
    };
    const cardsType: CARD_TYPE = CARD_TYPE.PEOPLE;

    const winner = gameService.compareCards(cards, cardsType);

    expect(winner).toBe(0);
  });

  it('should compare cards and return the correct winner - starships 1', () => {
    const cards: Cards = {
      player1: {
        ...testingCards.player1,
        crew: '85',
      } as Starship,
      player2: {
        ...testingCards.player2,
        crew: '75',
      } as Starship,
    };
    const cardsType: CARD_TYPE = CARD_TYPE.STARSHIPS;

    const winner = gameService.compareCards(cards, cardsType);

    expect(winner).toBe(1);
  });

  it('should compare cards and return the correct winner - starships 2', () => {
    const cards: Cards = {
      player1: {
        ...testingCards.player1,
        crew: '75',
      } as Starship,
      player2: {
        ...testingCards.player2,
        crew: '85',
      } as Starship,
    };
    const cardsType: CARD_TYPE = CARD_TYPE.STARSHIPS;

    const winner = gameService.compareCards(cards, cardsType);

    expect(winner).toBe(2);
  });

  it('should compare cards and return the correct winner - starships draw', () => {
    const cards: Cards = {
      player1: {
        ...testingCards.player1,
        crew: '75',
      } as Starship,
      player2: {
        ...testingCards.player2,
        crew: '75',
      } as Starship,
    };
    const cardsType: CARD_TYPE = CARD_TYPE.STARSHIPS;

    const winner = gameService.compareCards(cards, cardsType);

    expect(winner).toBe(0);
  });

  // getCards
  it('should return two cards', (done) => {
    gameService.getCards<People>(CARD_TYPE.PEOPLE).then((cards) => {
      expect(cards.player1).toBeTruthy();
      expect(cards.player2).toBeTruthy();
      done();
    });
  });

  it('should return two different cards', (done) => {
    gameService.getCards<People>(CARD_TYPE.PEOPLE).then((cards) => {
      expect(cards.player1).not.toEqual(cards.player2);
      done();
    });
  });

  it('should return two different cards - starships', (done) => {
    gameService.getCards<Starship>(CARD_TYPE.STARSHIPS).then((cards) => {
      expect(cards.player1).not.toEqual(cards.player2);
      done();
    });
  });

  // getResource

  it('should return a card', (done) => {
    gameService.getResource<People>(CARD_TYPE.PEOPLE).then((card) => {
      expect(card).toBeTruthy();
      done();
    });
  });

  it('should return a starship card', (done) => {
    gameService.getResource<Starship>(CARD_TYPE.STARSHIPS).then((card) => {
      expect(card.crew).toBeTruthy();
      done();
    });
  });

  it('should return a people card', (done) => {
    gameService.getResource<People>(CARD_TYPE.PEOPLE).then((card) => {
      expect(card.mass).toBeTruthy();
      done();
    });
  });

  it('should return a people card with mass', (done) => {
    gameService.getResource<People>(CARD_TYPE.PEOPLE).then((card) => {
      expect(card.mass).not.toBe('unknown');
      done();
    });
  });

  it('should return a starship card with crew', (done) => {
    gameService.getResource<Starship>(CARD_TYPE.STARSHIPS).then((card) => {
      expect(card.crew).not.toBe('unknown');
      done();
    });
  });
});
