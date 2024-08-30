import { Component, Input, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Person, Starship } from '../store/game.model';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
})
export class GameCardComponent {
  @Input() cardData: Person | Starship | null = null;

  constructor() {}
}
