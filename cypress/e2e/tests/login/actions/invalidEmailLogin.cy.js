describe('Visit homepage', () => {
    it('visit', () => {
        cy.visit('http://localhost:3000');
    })
})

describe('Register user', () => {
    it('click on the login button', () => {
        cy.get('.btn').contains('Ingresar').click();
    })
})

describe('Insert email at the input', () => {
    it('insert email', () => {
        cy.get('#email').click();
        cy.get('#email').type('administradorgmailcom');
    })
})

describe('Insert password at the input', () => {
    it('insert password', () => {
        cy.get('input[placeholder="Contraseña"]').click();
        cy.get('input[placeholder="Contraseña"]').type('Administrador#1994');
    })
})


describe('Login the user', () => {
    it('login user', () => {
        cy.get('#Login').click();
    })
})

describe('Show invalid email message', () => {
    it('invalid email', () => {
        cy.get('.swal2-popup');
    })
})