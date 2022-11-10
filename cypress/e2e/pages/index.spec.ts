context("/ on iphone-x", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport("iphone-x");
  });

  it("should have header on home page", () => {
    cy.findByTestId("header-container").should("exist");
    cy.findByTestId("dmc-explorer-logo").should("exist");
  });
});
