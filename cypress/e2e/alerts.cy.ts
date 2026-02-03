describe("Alerts (demoqa)", () => {
  beforeEach(() => {
    // Harden page load: stub flaky resources and tolerate non-2xx
    cy.intercept({ method: "GET", url: /.*recaptcha.*(\.js|api).*/ }, {
      statusCode: 200,
      headers: { "content-type": "application/javascript" },
      body: "/* stubbed recaptcha */ window.onloadCallback = function(){};"
    }).as("recaptchaStub");

    cy.intercept({ method: "GET", url: /.*\/fonts\/.*\.woff2/ }, { statusCode: 204 }).as("fontStub");

    cy.clearCookies();
    cy.clearLocalStorage();

    cy.visit("/alerts", { failOnStatusCode: false });
    cy.document({ timeout: 15000 }).its("readyState").should("eq", "complete");
    cy.location("pathname", { timeout: 15000 }).should("include", "/alerts");
    cy.get("#alertButton", { timeout: 15000 }).should("be.visible");
  });

  it("handles immediate alert", () => {
    cy.on("window:alert", (text) => {
      expect(text).to.match(/clicked a button/i);
    });
    cy.get("#alertButton").click();
  });

  it("handles timed alert", () => {
    cy.on("window:alert", (text) => {
      expect(text).to.match(/alert appeared after/i);
    });
    cy.get("#timerAlertButton").click();
  });

  it("handles confirm ok/cancel", () => {
    cy.window().then((win) => {
      cy.stub(win, "confirm").returns(true);
    });
    cy.get("#confirmButton").click();
    cy.get("#confirmResult").should("contain", "Ok");

    cy.window().then((win) => {
      (win.confirm as any).restore?.();
      cy.stub(win, "confirm").returns(false);
    });
    cy.get("#confirmButton").click();
    cy.get("#confirmResult").should("contain", "Cancel");
  });

  it("stubs prompt and verifies result", () => {
    const input = "Hello Cypress";
    cy.window().then((win) => {
      cy.stub(win, "prompt").returns(input);
    });
    cy.get("#promtButton").click();
    cy.get("#promptResult").should("contain", input);
  });
});
