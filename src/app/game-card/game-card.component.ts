import { Component, Input, input, OnChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CARD_TYPE, People, Starship } from '../store/game.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [MatCardModule, NgClass],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
})
export class GameCardComponent implements OnChanges {
  @Input() cardData: People | Starship | null = null;
  @Input() cardType: CARD_TYPE = CARD_TYPE.PEOPLE;
  @Input() isWinner: boolean = false;

  propertyName: string = '';
  propertyValue: string = '';

  constructor() {}

  ngOnChanges() {
    if (!this.cardData) return;

    switch (this.cardType) {
      case CARD_TYPE.PEOPLE:
        this.propertyName = 'Mass';
        this.propertyValue = (this.cardData as People).mass;
        break;
      case CARD_TYPE.STARSHIPS:
        this.propertyName = 'Crew';
        this.propertyValue = (this.cardData as Starship).crew;
        break;
    }
  }
}
