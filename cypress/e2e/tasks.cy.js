/// <reference types="Cypress" />

const checkVisiblity = (visible = true) => {
    // Controlla che gli elementi della modale
    // siano visibili in base all'argument boolean
    const visibility = `${visible ? '' : 'not.'}exist`
    cy.get('.backdrop').should(visibility)
    cy.get('dialog.modal').should(visibility)
}

describe('gestione delle task', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('apri e chiudi la modale task', () => {

        // Apriamo la modale
        cy.contains('Aggiungi To-Do').click()
        checkVisiblity()

        // Chiudiamo la modale da backdrop
        cy.get('.backdrop').click({force: true})
        checkVisiblity(false)

        // Riapriamo la modale
        cy.contains('Aggiungi To-Do').click()
        checkVisiblity()

        // Chiudiamo la modale da btn cancella
        cy.contains('Cancella').click()
        checkVisiblity(false)
    })

    it('inserisci un nuovo task', ()=>{

        // - Aprire la modale
        cy.contains('Aggiungi To-Do').click()
        checkVisiblity()

        // - Inserire un titolo
        cy.get('#title').type('Nuova Task')

        // - Inserire una descrizione
        cy.get('#summary').type('La descrizione del task')

        // - Salvare il To-Do
        cy.get('.modal').contains('Salva To-Do').click()
        checkVisiblity(false)
        
        // - Verificare che sia presente nella lista dei To-Do
        cy.get('.task').should('have.length', 1)
        cy.get('.task h2').should('have.text','Nuova Task')
        cy.get('.task p').should('have.text','La descrizione del task')
    })

    it('verifica la validazione del form', () => {

        // - Aprire la modale
        cy.contains('Aggiungi To-Do').click()
        checkVisiblity()

        cy.get('.modal').contains('Salva To-Do').click()

        // Verifica il testo d'errore
        cy.get('.error-message').should('be.visible')
        cy.get('.error-message').contains('Inserisci i valori')
    })

    it('verifica il funzionamento del filtro categoria', () => {

        // Aprire la modale
        cy.contains('Aggiungi To-Do').click()
        checkVisiblity()

        // Inserire un titolo
        cy.get('#title').type('Nuova Task')

        // - Inserire una descrizione
        cy.get('#summary').type('La descrizione del task')

        // Scegli uno degli elementi della slect
        cy.get('#category').select('urgent')

        // - Salvare il To-Do
        cy.get('.modal').contains('Salva To-Do').click()

        // Verifica l'esistenza del task appena creato con filtro 'all'
        cy.get('.task').should('have.length', 1)

        // Scegli uno degli elementi della select diverso da quello inserito in precedenza
        cy.get('#filter').select('low')

        // Verifica l'assenza del task appena creato
        cy.get('.task').should('have.length', 0)

        // Scelgo la categoria inserita nella modale
        cy.get('#filter').select('urgent')

        // Verifica la presenza del task appena creato con filtro 'urgent'
        cy.get('.task').should('have.length', 1)

        // Riseleziono la categoria 'all'
        cy.get('#filter').select('urgent')

        // Verifica la presenza del task appena creato con filtro 'all'
        cy.get('.task').should('have.length', 1)
    })

    it('aggiunti task multiple', () => {

        // Primo elemento
        cy.contains('Aggiungi To-Do').click()
        cy.get('#title').type('Task 1')
        cy.get('#summary').type('Primo task')
        cy.get('.modal').contains('Salva To-Do').click()

        // Verifica l'esistenza del primo task
        cy.get('.task').should('have.length', 1)

        // Secondo elemento
        cy.contains('Aggiungi To-Do').click()
        cy.get('#title').type('Task 2')
        cy.get('#summary').type('Secondo task')
        cy.get('.modal').contains('Salva To-Do').click()

        // Verifica l'esistenza del secondo task
        cy.get('.task').should('have.length', 2)

        // Terzo elemento
        cy.contains('Aggiungi To-Do').click()
        cy.get('#title').type('Task 3')
        cy.get('#summary').type('Terzo task')
        cy.get('.modal').contains('Salva To-Do').click()

        // Verifica l'esistenza del secondo task
        cy.get('.task').should('have.length', 3)

        cy.get('.task').first().should('include.text','Primo')
        cy.get('.task').eq(1).should('include.text','Secondo')
        cy.get('.task').last().should('include.text','Terzo')
        
    })

})
