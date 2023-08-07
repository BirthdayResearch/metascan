// TODO: Get tx hash from MainNet
context("/tx/[tid] on macbook-16", () => {
  const txHash =
    "0xbb93e0672425123aeb46f0e700c34d9699c21eb39645aa55879151c514a7bf5e";

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
      "(08-02-2023 05:56:29 AM +UTC)"
    );
    cy.findByTestId("transaction-block").should("have.text", "5009");
    cy.findByTestId("transaction-block")
      .should("have.attr", "href")
      .and("include", `/block/5009`);
    cy.findByTestId("transaction-confirmations").contains(" blocks");
    cy.findByTestId("transaction-type").should("have.text", "Token transfer");
    cy.findByTestId("transaction-status").should("have.text", "Success");
    cy.findByTestId("transaction-amount").contains("10.00000000 DFI");
    cy.findByTestId("transaction-fee").should("have.text", "0.00082347 DFI");
  });

  it("should display wallet details", () => {
    // From address
    cy.findByTestId("from-title").should("have.text", "From");
    cy.findByTestId("transaction-details-from")
      .should("have.attr", "href")
      .and("include", "/address/0xd65e74B211B7F762354D97e240ec469d7ea14121");
    // Interacted with contract
    cy.findByTestId("interacted-with-contract-(to)-title").should(
      "have.text",
      "Interacted with contract (To)"
    );
    cy.findByTestId("transaction-details-to")
      .should("have.attr", "href")
      .and("include", "/address/0xcd0218FECc757d7bdbb5198c7c059f08f327F64e");
    // Tokens transferred
    cy.findByTestId("tokens-transferred-title").should(
      "have.text",
      "Tokens transferred"
    );
    cy.findByTestId("token-transfers").should("be.visible");
    cy.findByTestId("token-transferred-from")
      .should("have.attr", "href")
      .and("include", "/address/0xcd0218FECc757d7bdbb5198c7c059f08f327F64e");
    cy.findByTestId("token-transferred-to")
      .should("have.attr", "href")
      .and("include", "/address/0xd65e74B211B7F762354D97e240ec469d7ea14121");
    // For token
    cy.findByTestId("token-transferred-for").should("be.visible");
    cy.findByTestId("for-token-container").contains("For: ");
    cy.findByTestId("token-transferred-for").should(
      "have.text",
      "10,000.00000000"
    );
    cy.findAllByTestId("token-transferred-for-symbol")
      .should("contain.text", "CAS")
      .should("have.attr", "href")
      .and("include", "/token/0xCEBd55D688f0f5C9DA311717a16e00e639b63dC2");
  });
});
