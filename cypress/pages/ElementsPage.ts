export class ElementsPage {
  visit() {
    cy.visit("/elements");
  }

  getHeader() {
    return cy.get(".main-header");
  }
}