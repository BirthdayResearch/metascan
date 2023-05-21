context("404 page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be able to display 404 page when url invalid", () => {
    cy.findByTestId("page-not-found").should("not.exist");
    cy.visit("/random-url", { failOnStatusCode: false });
    cy.findByTestId("page-not-found").should("be.visible");
  });

  it("should be able to redirect back to home", () => {
    cy.visit("/random-url", { failOnStatusCode: false });
    cy.findByTestId("page-not-found").should("be.visible");
    cy.findByTestId("return-home-button").click();
    cy.url().should("equal", "http://localhost:3000/");
  });
});
