describe("Check Box (demoqa)", () => {
  beforeEach(() => {
    cy.intercept({ method: "GET", url: /.*recaptcha.*(\.js|api).*/ }, {
      statusCode: 200,
      headers: { "content-type": "application/javascript" },
      body: "/* stubbed recaptcha */ window.onloadCallback = function(){};"
    }).as("recaptchaStub");

    cy.intercept({ method: "GET", url: /.*\/fonts\/.*\.woff2/ }, { statusCode: 204 }).as("fontStub");

    cy.clearCookies();
    cy.clearLocalStorage();

    cy.visit("/checkbox", { failOnStatusCode: false });
    cy.document({ timeout: 15000 }).its("readyState").should("eq", "complete");
    cy.location("pathname", { timeout: 15000 }).should("include", "/checkbox");
    cy.get('button[aria-label="Expand all"]', { timeout: 15000 }).should("be.visible");
  });

  it("expands tree and selects Desktop (verifies leaf results)", () => {
    cy.get('button[aria-label="Expand all"]').click();

    cy.get('label[for="tree-node-desktop"]').click();

    // DemoQA result lists leaf nodes, not just parent names
    cy.get("#result", { timeout: 10000 })
      .should("be.visible")
      .and("contain", "notes")
      .and("contain", "commands");
  });
});
