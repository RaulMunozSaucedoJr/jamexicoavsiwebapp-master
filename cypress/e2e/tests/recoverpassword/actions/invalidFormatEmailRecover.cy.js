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

describe('Insert email at the input', () => {
    it('insert email', () => {
        cy.get('.form-control').should('exist');
        cy.get('.form-control').should('exist').click().type('administradorgmailcom');
    })
})

describe('Click recover password', () => {
    it('recover password', () => {
        cy.get('form > :nth-child(1) > .btn').should('exist');
        cy.get('form > :nth-child(1) > .btn').should('exist').click();
    })
})

describe('Show message invalid email', ()=>{
    it('cant find email', ()=>{
        cy.get('.swal2-popup').contains('El formato');
    })
})