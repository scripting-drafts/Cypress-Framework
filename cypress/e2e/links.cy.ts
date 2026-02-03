describe("Links (demoqa)", () => {
  beforeEach(() => {
    // stub potentially problematic third-party resources to improve page stability
    cy.intercept({ method: "GET", url: /.*recaptcha.*(\.js|api).*/ }, {
      statusCode: 200,
      headers: { "content-type": "application/javascript" },
      body: "/* stubbed recaptcha */ window.onloadCallback = function(){};"
    }).as("recaptchaStub");

    cy.intercept({ method: "GET", url: /.*\/fonts\/.*\.woff2/ }, { statusCode: 204 }).as("fontStub");

    cy.clearCookies();
    cy.clearLocalStorage();

    cy.visit("/links", { failOnStatusCode: false });
    cy.document({ timeout: 15000 }).its("readyState").should("eq", "complete");
    cy.location("pathname", { timeout: 15000 }).should("include", "/links");
    cy.get("#linkWrapper", { timeout: 15000 }).should("be.visible");
  });

  it("opens simple link in same tab", () => {
    cy.get("#simpleLink").should("have.attr", "href").and("include", "demoqa.com");
    cy.get("#simpleLink").invoke("removeAttr", "target").click();
    cy.url().should("include", "demoqa.com");
    // Reset cleanly to links page to avoid cross-origin back/forward flakiness
    cy.visit("/links", { failOnStatusCode: false });
    cy.get("#linkWrapper", { timeout: 15000 }).should("be.visible");
  });

  it("verifies API 'created' link returns 201", () => {
    cy.intercept({ method: "GET", url: "**/created" }).as("created");
    cy.get("#created").click();
    cy.wait("@created", { timeout: 15000 }).its("response.statusCode").should("eq", 201);
  });
});
