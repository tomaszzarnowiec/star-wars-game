import { Injectable } from '@angular/core';
import { CARD_TYPE, Cards } from './game.model';
import _, { get } from 'lodash';

@Injectable({ providedIn: 'root' })
export class GameService {
  constructor() {}

  getResource<T>(type: CARD_TYPE): Promise<T> {
    const rand = _.random(1, 30);
    return fetch(`https://swapi.dev/api/${type}/${rand}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('data', data);
        if (data.detail) {
          return this.getResource<T>(type);
        }
        return data as T;
      })
      .catch((error) => {
        console.error('Error:', error);
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

    const player1Value = _.get(cards.player1, compareBy) || 0;
    const player2Value = _.get(cards.player2, compareBy) || 0;

    const winner =
      player1Value > player2Value ? 1 : player1Value < player2Value ? 2 : 0;

    return winner;
  }
}
