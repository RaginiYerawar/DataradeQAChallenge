beforeEach(function () {
    cy.visit(Cypress.env("url"))
    cy.wait(1000)
})
