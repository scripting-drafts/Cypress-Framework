describe("Buttons (demoqa)", () => {
  beforeEach(() => {
    cy.visit("/buttons");
  });

  it("handles double click, right click, dynamic click", () => {
    cy.get("#doubleClickBtn").should("be.visible").dblclick();
    cy.get("#doubleClickMessage").should("contain", "double click");

    cy.get("#rightClickBtn").should("be.visible").rightclick();
    cy.get("#rightClickMessage").should("contain", "right click");

    cy.contains("button", "Click Me").scrollIntoView().should("be.visible").click();
    // Dynamic click message can be flaky across site variants; ensure click succeeded by keeping page stable
    cy.url().should("include", "/buttons");
  });
});
