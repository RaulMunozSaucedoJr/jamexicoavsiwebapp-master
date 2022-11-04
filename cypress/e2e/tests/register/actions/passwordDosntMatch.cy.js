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
        cy.get('input[placeholder="Correo electrónico"]').type('lalo@gmail.com');
    })
})

describe('Insert password at the input', () => {
    it('insert email', () => {
        cy.get('input[placeholder="Contraseña"]').click();
        cy.get('input[placeholder="Contraseña"]').type('Lalo#1994');
    })
})

describe('Insert repeat password at the input', () => {
    it('insert password', () => {
        cy.get('input[placeholder="Repetir contraseña"]').click();
        cy.get('input[placeholder="Repetir contraseña"]').type('Pepe#1994');
    })
})

describe('Register the user', () => {
    it('submit user', () => {
        cy.get('#submit').click();
    })
}) 

describe('Show message passwords dosnt match', () => {
    it('password dosnt match', () => {
        cy.get('.swal2-popup');
    })
})