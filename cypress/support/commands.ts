// Custom commands and TypeScript augmentation

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      fillPracticeForm(data: { firstName: string; lastName: string; email: string }): Chainable<Element>;
    }
  }
}

Cypress.Commands.add("fillPracticeForm", (data: { firstName: string; lastName: string; email: string }) => {
  cy.get("#firstName").clear().type(data.firstName);
  cy.get("#lastName").clear().type(data.lastName);
  cy.get("#userEmail").clear().type(data.email);
});
export {};