describe.skip("/tx/[tid] on macbook-16", () => {
  // TODO: Replace with mainnet transaction id
  const txHash =
    "0x760e433e8d215309412d8ecd9927192ddf61d0f2546e532951c129ce5bc33c7b";

  beforeEach(() => {
    cy.visit(`/tx/${txHash}`);
    cy.viewport("macbook-16");
  });

  it("should display page header, footer and search bar", () => {
    cy.findByTestId("header-container").should("be.visible");
    cy.findByTestId("footer-container").should("be.visible");
    cy.findByTestId("search-bar-container").should("be.visible");
  });

  it("should display page title", () => {
    cy.findByTestId("transaction-details-title")
      .should("be.visible")
      .should("have.text", "Transaction details");
  });

  it("should display transaction details", () => {
    cy.findByTestId("tx-hash").should("have.text", txHash);
    cy.findByTestId("transaction-timestamp").contains(
      "(07-26-2023 09:31:33 AM +UTC)"
    );
    cy.findByTestId("transaction-block").should("have.text", "89946");
    cy.findByTestId("transaction-block")
      .should("have.attr", "href")
      .and("include", `/block/89946`);
    cy.findByTestId("transaction-confirmations").contains(" blocks");
    cy.findByTestId("transaction-type").should("have.text", "Token minting");
    cy.findByTestId("transaction-status").should("have.text", "Success");
    cy.findByTestId("transaction-amount").contains("0.00000000 DFI");
    cy.findByTestId("transaction-fee").should("have.text", "0.00042306 DFI");
  });

  it("should display wallet details", () => {
    // From address
    cy.findByTestId("from-title").should("have.text", "From");
    cy.findByTestId("transaction-details-from")
      .should("have.attr", "href")
      .and("include", "/address/0x36375828fd821935cFf3E8AB6322cAb54BBfaDeC");
    // Interacted with contract
    cy.findByTestId("interacted-with-contract-(to)-title").should(
      "have.text",
      "Interacted with contract (To)"
    );
    cy.findByTestId("transaction-details-to")
      .should("have.attr", "href")
      .and("include", "/address/0xE815f2aD238B218E6becb93d846EA8FF90eDB39C");
    // Tokens minted
    cy.findByTestId("tokens-minted-title").should("have.text", "Tokens minted");
    cy.findByTestId("token-transfers").should("be.visible");
    cy.findByTestId("token-transferred-from")
      .should("have.attr", "href")
      .and("include", "/address/0x0000000000000000000000000000000000000000");
    cy.findByTestId("token-transferred-to")
      .should("have.attr", "href")
      .and("include", "/address/0x36375828fd821935cFf3E8AB6322cAb54BBfaDeC");
    // For token
    cy.findByTestId("token-transferred-for").should("be.visible");
    cy.findByTestId("for-token-container").contains("For: ");
    cy.findByTestId("token-transferred-for").should(
      "have.text",
      "100,000.00000000"
    );
    cy.findAllByTestId("token-transferred-for-symbol")
      .should("contain.text", "fDUSD")
      .should("have.attr", "href")
      .and("include", "/token/0xE815f2aD238B218E6becb93d846EA8FF90eDB39C");
  });
});
