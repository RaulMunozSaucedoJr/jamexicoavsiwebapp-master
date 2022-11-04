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
        cy.get('.form-control').should('exist').click().type('simkerboy_13@hotmail.com');
    })
})

describe('Click recover password', () => {
    it('recover password', () => {
        cy.get('form > :nth-child(1) > .btn').should('exist');
        cy.get('form > :nth-child(1) > .btn').should('exist').click();
    })
})

describe('Show success message', ()=>{
    it('send to email', ()=>{
        cy.get('.swal2-popup').contains('Se ha enviado el link para recuperación de contraseña al siguiente correo');
    })
})