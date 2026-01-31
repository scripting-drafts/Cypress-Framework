export class PracticeFormPage {
  visit() {
    cy.visit("/automation-practice-form");
  }

  getFirstName() {
    return cy.get("#firstName");
  }

  getLastName() {
    return cy.get("#lastName");
  }

  getEmail() {
    return cy.get("#userEmail");
  }

  submit() {
    return cy.get("#submit").click();
  }
}