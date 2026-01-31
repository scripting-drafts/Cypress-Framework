import { PracticeFormPage } from "../pages/PracticeFormPage";

const page = new PracticeFormPage();

describe("Practice Form (demoqa)", () => {
  it("loads the form and submits basic data", () => {
    page.visit();
    page.getFirstName().should("exist");
    page.getLastName().should("exist");
    page.getEmail().should("exist");

    // use custom command to fill the form
    cy.fillPracticeForm({ firstName: "Jane", lastName: "Doe", email: "jane.doe@example.com" });

    // attempt submit if present
    cy.get("#submit").click();

    // basic assertion to confirm we stayed on the expected page (or modal handling can be added)
    cy.url().should("include", "/automation-practice-form");
  });
});