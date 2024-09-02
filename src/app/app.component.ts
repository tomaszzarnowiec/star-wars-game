import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { GameActions } from './store/game.actions';
import { CARD_TYPE, Cards, Score } from './store/game.model';
import { Observable, Subject } from 'rxjs';
import { GameState } from './store/game.state';
import _ from 'lodash';
import { AsyncPipe, NgIf } from '@angular/common';
import { GameCardComponent } from './game-card/game-card.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, AsyncPipe, GameCardComponent, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  store = inject(Store);

  title = 'star-wars-game';
  cardsType = CARD_TYPE.PEOPLE;
  score$: Observable<Score> = this.store.select(GameState.getScore);
  wins$: Observable<number | null> = this.store.select(GameState.getWinner);
  cards$: Observable<Cards> = this.store.select(GameState.getCards);

  constructor() {}

  ngOnInit() {
    this.newGame();

    this.cards$.subscribe((cards) => {
      console.log('component cards', cards);
    });

    this.score$.subscribe((score) => {
      console.log('component score', score);
    });

    this.wins$.subscribe((wins) => {
      console.log('component wins', wins);
    });
  }

  setCardsType(cardsType: CARD_TYPE) {
    this.cardsType = cardsType as CARD_TYPE;
    this.store.dispatch(new GameActions.SetCardsType(cardsType));
  }

  newGame() {
    this.store.dispatch(new GameActions.NewGame());
  }

  nextTurn() {
    this.store.dispatch(new GameActions.NextTurn(this.cardsType));
  }
}
