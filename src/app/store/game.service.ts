import { Injectable } from '@angular/core';
import { CARD_TYPE, Cards } from './game.model';
import _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class GameService {
  constructor() {}

  getResource<T>(type: CARD_TYPE): Promise<T> {
    const rand = _.random(1, 30);
    return fetch(`https://swapi.dev/api/${type}/${rand}`)
      .then((response) => {
        return response.json();
      })
      .then((data: any) => {
        if (
          data.detail ||
          (type === CARD_TYPE.PEOPLE && data.mass === 'unknown') ||
          (type === CARD_TYPE.STARSHIPS && data.crew === 'unknown')
        ) {
          return this.getResource<T>(type);
        }

        return data as T;
      })
      .catch((error) => {
        return this.getResource<T>(type);
      });
  }

  getCards<T>(type: CARD_TYPE): Promise<{ player1: T; player2: T }> {
    const card1 = this.getResource<T>(type);
    const card2 = this.getResource<T>(type);

    return Promise.all([card1, card2]).then(([player1, player2]) => {
      return { player1, player2 };
    });
  }

  compareCards(cards: Cards, cardsType: CARD_TYPE) {
    const compareBy = cardsType === CARD_TYPE.PEOPLE ? 'mass' : 'crew';

    const player1Value = parseFloat(
      _(cards.player1).get(compareBy)?.replaceAll(',', '') as string
    );
    const player2Value = parseFloat(
      _(cards.player2).get(compareBy)?.replaceAll(',', '') as string
    );

    const winner =
      player1Value > player2Value ? 1 : player1Value < player2Value ? 2 : 0;

    return winner;
  }
}
