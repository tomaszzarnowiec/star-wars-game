import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { GameActions } from './store/game.actions';
import { CARD_TYPE, Cards, Score } from './store/game.model';
import { Observable } from 'rxjs';
import { GameState } from './store/game.state';
import _ from 'lodash';
import { AsyncPipe, NgFor, NgForOf, NgIf } from '@angular/common';
import { GameCardComponent } from './game-card/game-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
    NgForOf,
    AsyncPipe,
    GameCardComponent,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  store = inject(Store);

  title = 'star-wars-game';
  cardsTypes = Object.values(CARD_TYPE);
  cardsType = CARD_TYPE.PEOPLE;
  score$: Observable<Score> = this.store.select(GameState.getScore);
  wins$: Observable<number | null> = this.store.select(GameState.getWinner);
  cards$: Observable<Cards> = this.store.select(GameState.getCards);

  constructor() {}

  ngOnInit() {
    this.cardsType = CARD_TYPE.PEOPLE;
    this.newGame();
  }

  setCardsType(event: MatSelectChange) {
    console.log(event);
    this.cardsType = event.value as CARD_TYPE;
    this.store.dispatch(new GameActions.SetCardsType(this.cardsType));
  }

  newGame() {
    this.store.dispatch(new GameActions.NewGame(this.cardsType));
  }

  nextTurn() {
    this.store.dispatch(new GameActions.NextTurn(this.cardsType));
  }
}
