context("/ on iphone-x", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport("iphone-x");
  });

  it("should have Metascan on home page", () => {
    cy.findByTestId("home").contains('Metascan')
  });
});
