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
        cy.get('input[placeholder="Correo electrónico"]').type('administrador@gmail.com');
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

describe('Toggle to show the inserted password', () => {
    it('show password', () => {
        cy.get('.form-check-input').click();
    })
})

describe('Toggle to hide the inserted password', () => {
    it('hide password', () => {
        cy.get('.form-check-input').click();
    })
})

describe('Register the user', () => {
    it('submit user', () => {
        cy.get('#submit').click();
    })
})

describe('Show success message', ()=>{
    it('success register', ()=>{
        cy.get('.swal2-popup').contains('Bienvenido');
    })
})

