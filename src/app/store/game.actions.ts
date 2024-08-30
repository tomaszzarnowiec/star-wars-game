import { CARD_TYPE, Cards, Person, Starship } from './game.model';

export namespace GameActions {
  export class SetCards {
    static readonly type = '[Game] Set Cards';
    constructor(public cards: Cards) {}
  }

  export class SetCardsType {
    static readonly type = '[Game] Set Cards Type';
    constructor(public cardsType: CARD_TYPE) {}
  }

  export class IncreasePlayerScore {
    static readonly type = '[Game] Increase Player Score';
    constructor(public player: number) {}
  }

  export class NewGame {
    static readonly type = '[Game] New Game';
  }

  export class NextTurn {
    static readonly type = '[Game] Next Turn';
    constructor(public cardsType: CARD_TYPE) {}
  }
}
