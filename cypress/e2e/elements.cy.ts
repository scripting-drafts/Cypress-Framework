import { ElementsPage } from "../pages/ElementsPage";

const page = new ElementsPage();

describe("Elements (demoqa)", () => {
  it("loads the Elements landing and shows the header", () => {
    page.visit();
    page.getHeader().should("be.visible");
  });
});