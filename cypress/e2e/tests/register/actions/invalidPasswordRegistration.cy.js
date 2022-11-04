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
        cy.get('input[placeholder="Correo electrónico"]').type('pepe@gmail.com');
    })
})

describe('Insert password at the input', () => {
    it('insert email', () => {
        cy.get('input[placeholder="Contraseña"]').click();
        cy.get('input[placeholder="Contraseña"]').type('pepe');
    })
})

describe('Insert repeat password at the input', () => {
    it('insert password', () => {
        cy.get('input[placeholder="Repetir contraseña"]').click();
        cy.get('input[placeholder="Repetir contraseña"]').type('pepe');
    })
})

describe('Register the user', () => {
    it('submit user', () => {
        cy.get('#submit').click();
    })
})

describe('Show invalid email message', () => {
    it('invalid email', () => {
        cy.get('.swal2-popup').contains('La contraseña');
    })
})