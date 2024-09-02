export interface GameStateModel {
  score: Score;
  cards: Cards;
  winner: number | null;
  cardsType: CARD_TYPE;
}

export enum CARD_TYPE {
  PEOPLE = 'people',
  STARSHIPS = 'starships',
}

export const initialGameState: GameStateModel = {
  score: {
    player1: 0,
    player2: 0,
  },
  cards: {
    player1: null,
    player2: null,
  },
  winner: null,
  cardsType: CARD_TYPE.PEOPLE,
};

export class People {
  height: string = '';
  mass: string = '';
  hair_color: string = '';
  skin_color: string = '';
  eye_color: string = '';
  birth_year: string = '';
  gender: string = '';
  created: string = '';
  edited: string = '';
  name: string = '';
  homeworld: string = '';
  url: string = '';
}

export class Starship {
  model: string = '';
  starship_class: string = '';
  manufacturer: string = '';
  cost_in_credits: string = '';
  length: string = '';
  crew: string = '';
  passengers: string = '';
  max_atmosphering_speed: string = '';
  hyperdrive_rating: string = '';
  MGLT: string = '';
  cargo_capacity: string = '';
  consumables: string = '';
  pilots: any[] = [];
  created: string = '';
  edited: string = '';
  name: string = '';
  url: string = '';
}

export interface Cards {
  player1: People | Starship | null;
  player2: People | Starship | null;
}

export interface Score {
  player1: number;
  player2: number;
}

export interface ApiResponse<T> {
  message: string;
  result: T;
}
