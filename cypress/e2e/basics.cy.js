/// <reference types="Cypress" />

describe('Pagina delle task', () => {

  it(`visualizza l'immagine principale`, () => {
    cy.visit('http://localhost:5173/')
    // cy.get('.main-header img')
    cy.find('.main-header').find('img')
  })

  it(`visualizza il titolo della pagina principale`, () => {
    cy.visit('http://localhost:5173/')
    cy.get('h1').should('have.length', 1)
    cy.get('h1').contains('To-Do del mio corso su Cypress').should('exist')
    cy.contains('To-Do del mio corso su Cypress')
  })

})