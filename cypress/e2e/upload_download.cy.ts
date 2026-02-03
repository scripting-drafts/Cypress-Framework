describe("Upload and Download (demoqa)", () => {
  beforeEach(() => {
    cy.visit("/upload-download");
  });

  it("uploads a file and verifies uploaded path", () => {
    const fixturePath = "cypress/fixtures/upload.txt";
    cy.get("#uploadFile").should("exist").selectFile(fixturePath, { force: true });
    cy.get("#uploadedFilePath").should("contain", "upload.txt");
  });

  it("shows a download button", () => {
    cy.get("#downloadButton").should("be.visible");
  });
});
