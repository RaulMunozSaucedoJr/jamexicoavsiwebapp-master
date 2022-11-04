describe('Visit homepage', () => {
    it('visit', () => {
        cy.visit('http://localhost:3000/');
    })
})

describe('Scrolling homepage to bottom', () => {
    it('scroll', () => {
        cy.scrollTo(0, 6000, {
            duration: 10000
        });
    })
})

describe('Scrolling homepage to top', () => {
    it('scroll', () => {
        cy.scrollTo(-6000, 0, {
            duration: 10000
        });
    })
})
