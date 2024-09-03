import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
  CARD_TYPE,
  GameStateModel,
  initialGameState,
  People,
  Starship,
} from './game.model';
import { GameActions } from './game.actions';
import { inject, Injectable } from '@angular/core';
import { GameService } from '../services/game.service';
import _ from 'lodash';

@Injectable()
@State<GameStateModel>({
  name: 'game',
  defaults: initialGameState,
})
export class GameState {
  gameService = inject(GameService);

  @Selector()
  static getScore(state: GameStateModel) {
    return state.score;
  }

  @Selector()
  static getCards(state: GameStateModel) {
    return state.cards;
  }

  @Selector()
  static getWinner(state: GameStateModel) {
    return state.winner;
  }

  @Selector()
  static getCardsType(state: GameStateModel) {
    return state.cardsType;
  }

  @Action(GameActions.SetCards)
  setCards(
    { dispatch, getState, patchState }: StateContext<GameStateModel>,
    { cards }: GameActions.SetCards
  ) {
    const state = getState();

    const winner = this.gameService.compareCards(cards, state.cardsType);

    if (winner > 0) {
      dispatch(new GameActions.IncreasePlayerScore(winner));
    }

    patchState({
      cards,
      winner,
    });
  }

  @Action(GameActions.SetCardsType)
  setCardsType(
    { dispatch, patchState }: StateContext<GameStateModel>,
    { cardsType }: GameActions.SetCardsType
  ) {
    patchState({
      cardsType,
    });

    dispatch(new GameActions.NewGame(cardsType));
  }

  @Action(GameActions.IncreasePlayerScore)
  increasePlayerScore(
    { getState, patchState }: StateContext<GameStateModel>,
    { player }: GameActions.IncreasePlayerScore
  ) {
    const state = getState();
    const scoreKey = `player${player}`;
    const newScore = _.get(state.score, scoreKey, 0) + 1;

    patchState({
      score: {
        ...state.score,
        [scoreKey]: newScore,
      },
    });
  }

  @Action(GameActions.NewGame)
  newGame(
    { dispatch, patchState }: StateContext<GameStateModel>,
    { cardsType }: GameActions.NewGame
  ) {
    patchState({
      score: {
        player1: 0,
        player2: 0,
      },
    });

    dispatch(new GameActions.NextTurn(cardsType));
  }

  @Action(GameActions.NextTurn)
  nextTurn(
    { dispatch, patchState }: StateContext<GameStateModel>,
    { cardsType }: GameActions.NextTurn
  ) {
    patchState({ winner: null });
    console.log('next turn', cardsType);

    let request;

    if (cardsType === CARD_TYPE.PEOPLE) {
      request = this.gameService.getCards<People>(cardsType);
    } else if (cardsType === CARD_TYPE.STARSHIPS) {
      request = this.gameService.getCards<Starship>(cardsType);
    }

    return request?.then((cards) => {
      console.log('cards rquests', cards);

      return dispatch(new GameActions.SetCards(cards));
    });
  }
}
