describe('Visit homepage', () => {
    it('visit', () => {
        cy.visit('http://localhost:3000');
    })
})

describe('Visit login', () => {
    it('click on the login button', () => {
        cy.get('.btn').contains('Ingresar').click();
    })
})

describe('Recover password', ()=>{
    it('Click on the link to recover password', ()=>{
        cy.get('#login > :nth-child(4) > a').should('exist');
        cy.get('#login > :nth-child(4) > a').click();
        cy.get('h1').contains('Recuperar contraseña');
    })
})