import { ElementsPage } from "../pages/ElementsPage";
const page = new ElementsPage();

describe("Elements (demoqa) — robust", () => {
  beforeEach(() => {
    // optional: stub problematic third-party resources to avoid blocking rendering
    cy.intercept({ method: "GET", url: /.*recaptcha.*(\.js|api).*/ }, {
      statusCode: 200,
      headers: { "content-type": "application/javascript" },
      body: "/* stubbed recaptcha */ window.onloadCallback = function(){};"
    }).as("recaptchaStub");

    cy.intercept({ method: "GET", url: /.*\/fonts\/.*\.woff2/ }, { statusCode: 204 }).as("fontStub");
  });

  it("navigates to Elements and finds header", () => {
    page.visitDirect();

    cy.location("pathname").then((p) => {
      cy.log("current pathname:", p);
      if (!p.includes("/elements")) {
        page.visitViaHome();
      }
    });

    page.getHeader()
      .should("be.visible")
      .then(() => {
        cy.screenshot("elements-header-found");
      })
      

    cy.document().then((doc) => {
      const html = doc.documentElement?.outerHTML ?? "";
      // log a small slice to Cypress log so you can inspect it in test runner
      cy.log("page HTML head (first 2000 chars):", html.slice(0, 2000));
    });
  });
});