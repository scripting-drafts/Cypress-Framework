describe("Text Box (demoqa)", () => {
  beforeEach(() => {
    cy.visit("/text-box");
  });

  it("fills and submits the form, verifies output", () => {
    const name = "John Doe";
    const email = "john.doe@example.com";
    const currentAddress = "123 Current St\nCity";
    const permanentAddress = "456 Permanent Ave\nTown";

    cy.get("#userName").clear().type(name);
    cy.get("#userEmail").clear().type(email);
    cy.get("#currentAddress").clear().type(currentAddress);
    cy.get("#permanentAddress").clear().type(permanentAddress);

    cy.get("#submit").click();

    cy.get("#output").should("be.visible")
      .and("contain", name)
      .and("contain", email)
      .and("contain", "Current Address")
      .and("contain", "Permananet Address");
  });
});
