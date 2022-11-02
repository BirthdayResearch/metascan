context("/ on iphone-x", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport("iphone-x");
  });

  it("should have header on home page", () => {
    cy.findByTestId("Header.Container").should("exist");
    cy.findByTestId("dmc_explorer_logo").should("exist");
  });
});
