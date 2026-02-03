describe("Radio Button (demoqa)", () => {
  beforeEach(() => {
    cy.visit("/radio-button");
  });

  it("selects Yes and Impressive; No is disabled", () => {
    cy.get('label[for="yesRadio"]').click();
    cy.get(".text-success").should("contain", "Yes");

    cy.get('label[for="impressiveRadio"]').click();
    cy.get(".text-success").should("contain", "Impressive");

    cy.get('#noRadio').should('be.disabled');
  });
});
