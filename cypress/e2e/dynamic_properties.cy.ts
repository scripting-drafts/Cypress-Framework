describe("Dynamic Properties (demoqa)", () => {
  beforeEach(() => {
    // Harden page load: stub flaky resources and allow non-2xx
    cy.intercept({ method: "GET", url: /.*recaptcha.*(\.js|api).*/ }, {
      statusCode: 200,
      headers: { "content-type": "application/javascript" },
      body: "/* stubbed recaptcha */ window.onloadCallback = function(){};"
    }).as("recaptchaStub");

    cy.intercept({ method: "GET", url: /.*\/fonts\/.*\.woff2/ }, { statusCode: 204 }).as("fontStub");

    cy.clearCookies();
    cy.clearLocalStorage();

    cy.visit("/dynamic-properties", { failOnStatusCode: false });
    cy.document({ timeout: 20000 }).its("readyState").should("eq", "complete");
    cy.location("pathname", { timeout: 20000 }).should("include", "/dynamic-properties");

    // If the main button isn't present, navigate via UI fallback
    cy.get("body", { timeout: 5000 }).then(($body) => {
      if ($body.find("#enableAfter").length === 0) {
        cy.visit("/", { failOnStatusCode: false });
        cy.contains(".card-body", "Elements", { timeout: 15000 }).should("be.visible").click();
        cy.contains(".element-list .menu-list li", "Dynamic Properties", { timeout: 15000 })
          .should("be.visible")
          .click();
      }
    });

    cy.get("#enableAfter", { timeout: 20000 }).should("exist");
  });

  it("button becomes enabled after delay", () => {
    cy.get("#enableAfter").should("be.disabled");
    cy.get("#enableAfter", { timeout: 8000 }).should("be.enabled");
  });

  it("button becomes visible after delay", () => {
    cy.get("#visibleAfter", { timeout: 15000 }).should("be.visible");
  });

  it("color changes after delay", () => {
    cy.get("#colorChange").should("be.visible").then(($btn) => {
      const initialColor = getComputedStyle($btn[0]).color;
      cy.wait(6500);
      cy.get("#colorChange").should(($el) => {
        const newColor = getComputedStyle($el[0]).color;
        expect(newColor).not.to.eq(initialColor);
      });
    });
  });
});
