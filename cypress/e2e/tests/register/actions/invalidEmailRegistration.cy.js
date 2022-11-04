describe('Visit homepage', () => {
    it('visit', () => {
        cy.visit('http://localhost:3000/');
    })
})

describe('Register user', () => {
    it('click on the register button', () => {
        cy.get('.btn').contains('Registrate').click();
    })
})

describe('Insert email at the input', () => {
    it('insert email', () => {
        cy.get('input[placeholder="Correo electrónico"]').click();
        cy.get('input[placeholder="Correo electrónico"]').type('administradorgmailcom');
    })
})

describe('Insert password at the input', () => {
    it('insert email', () => {
        cy.get('input[placeholder="Contraseña"]').click();
        cy.get('input[placeholder="Contraseña"]').type('Administrador#1994');
    })
})

describe('Insert repeat password at the input', () => {
    it('insert password', () => {
        cy.get('input[placeholder="Repetir contraseña"]').click();
        cy.get('input[placeholder="Repetir contraseña"]').type('Administrador#1994');
    })
})

describe('Register the user', () => {
    it('submit user', () => {
        cy.get('#submit').click();
        cy.wait(1000);
    })
})

describe('Show invalid email message', () => {
    it('invalid email', () => {
        cy.get('.swal2-popup');
    })
})