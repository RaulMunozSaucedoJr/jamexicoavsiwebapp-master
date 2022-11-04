describe('Visit homepage', () => {
    it('visit', () => {
        cy.visit('http://localhost:3000/');
    })
})

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

