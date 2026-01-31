export class ElementsPage {
  visitDirect() {
    // direct visit (keep for quick direct checks)
    cy.visit("/elements");
    cy.location("pathname", { timeout: 10000 }).should("include", "/elements");
  }

  visitViaHome() {
    // reliable navigation: open home and click the Elements card if direct visit fails
    cy.visit("/");
    // wait for homepage cards to render then click the Elements card
    cy.contains(".card-body", "Elements", { timeout: 10000 })
      .should("be.visible")
      .click();
    cy.location("pathname", { timeout: 10000 }).should("include", "/elements");
  }

  getHeader() {
    // primary selector with extended timeout
    return cy.get("#app > header:nth-child(1)", { timeout: 10000 });
  }
}