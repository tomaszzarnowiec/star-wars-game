import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GameCardComponent } from './game-card.component';
import { CARD_TYPE, People, Starship } from '../store/game.model';
import { MatCardModule } from '@angular/material/card';
import { NgClass } from '@angular/common';

describe('GameCardComponent', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, NgClass, GameCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should set propertyName to "Mass" and propertyValue to the mass of cardData when cardType is PEOPLE', () => {
      let peopleData: People = new People();
      peopleData.mass = '75';

      component.cardData = peopleData;
      component.cardType = CARD_TYPE.PEOPLE;

      component.ngOnChanges();

      expect(component.propertyName).toBe('Mass');
      expect(component.propertyValue).toBe('75');
    });

    it('should set propertyName to "Crew" and propertyValue to the crew of cardData when cardType is STARSHIPS', () => {
      let starshipData: Starship = new Starship();
      starshipData.crew = '200';
      component.cardData = starshipData;
      component.cardType = CARD_TYPE.STARSHIPS;

      component.ngOnChanges();

      expect(component.propertyName).toBe('Crew');
      expect(component.propertyValue).toBe('200');
    });

    it('should not set property values if cardData is null', () => {
      component.cardData = null;

      component.ngOnChanges();

      expect(component.propertyName).toBe('');
      expect(component.propertyValue).toBe('');
    });
  });

  describe('template rendering', () => {
    it('should display the correct property name and value in the template', () => {
      let peopleData: People = new People();
      peopleData.mass = '75';

      component.cardData = peopleData;
      component.cardType = CARD_TYPE.PEOPLE;
      component.ngOnChanges();
      fixture.detectChanges();

      const propertyElement = fixture.debugElement.query(
        By.css('.game-card-content-name')
      ).nativeElement;
      const valueElement = fixture.debugElement.query(
        By.css('.game-card-content-value')
      ).nativeElement;

      expect(propertyElement.textContent).toContain('Mass');
      expect(valueElement.textContent).toContain('75');
    });

    it('should apply the winner class if isWinner is true', () => {
      component.isWinner = true;
      fixture.detectChanges();

      const cardElement = fixture.debugElement.query(
        By.css('.card')
      ).nativeElement;
      expect(cardElement.classList).toContain('wins');
    });

    it('should not apply the winner class if isWinner is false', () => {
      component.isWinner = false;
      fixture.detectChanges();

      const cardElement = fixture.debugElement.query(
        By.css('.card')
      ).nativeElement;
      expect(cardElement.classList).not.toContain('wins');
    });
  });
});
