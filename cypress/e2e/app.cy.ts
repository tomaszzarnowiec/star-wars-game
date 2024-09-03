import _ from 'lodash';

describe('Star wars Game e2e testing', () => {
  it('Visits the initial game page', () => {
    cy.visit('/');
    cy.get('.game .game-score-number').contains('0 : 0');
  });

  it('Starts the game automaticly', () => {
    cy.visit('/');
    // h3 is the title of the card, and it should be not empty
    cy.get('.game .card:first-child h3').should('not.be.empty');
  });

  it('Starts the new game', () => {
    cy.visit('/');
    cy.get('.game .game-actions-new').click();

    cy.get('.game .game-score-wins span').then(($wins) => {
      if ($wins.text() === 'Draw') {
        cy.get('.game .game-score-number').should('contain', '0 : 0');
      } else {
        cy.get('.game .game-score-number').should('not.contain', '0 : 0');
      }
    });
  });

  it('Starts the new game and check if one of card will have "wins" class', () => {
    cy.visit('/');
    cy.get('.game .game-actions-new').click();
    cy.get('.game .card.wins').should('have.length', 1);
  });

  it('Starts new round of the game', () => {
    cy.visit('/');

    cy.get('.game .game-score-number').then(($score) => {
      const score = $score.text();
      cy.get('.game .game-actions-next').click();
      cy.get('.game .game-score-number').should('not.contain', score);
    });
  });

  it('Starts new round and check if one of card will have "wins" class', () => {
    cy.visit('/');
    cy.get('.game .game-actions-next').click();
    cy.get('.game .card.wins').should('have.length', 1);
  });
});
