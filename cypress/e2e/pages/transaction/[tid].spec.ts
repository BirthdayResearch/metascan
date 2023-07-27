// Token transfer (minting): /tx/0x760e433e8d215309412d8ecd9927192ddf61d0f2546e532951c129ce5bc33c7b
// Token transfer: /tx/0x453f8c0b486c4c3773ae059a54b8b5d5a8a35391cc52b4e0ec3530be8c674622
// Contract call:
// Normal Transaction: /tx/0x45496f046c1c33569860bf3950db2d7edf9706b9ee16bc566a20d2febe90af7e

const txHash =
  "0x45496f046c1c33569860bf3950db2d7edf9706b9ee16bc566a20d2febe90af7e";

context("/tx/[tid] on macbook-16", () => {
  beforeEach(() => {
    cy.visit(`/tx/${txHash}?network=TestNet`);
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

  it("should display transaction hash", () => {
    cy.findByTestId("tx-hash").should("have.text", txHash);
    cy.findByTestId("transaction-id-copied").should("not.exist");
    cy.findByTestId("copy-transaction-id").trigger("click");
    cy.findByTestId("transaction-id-copied").should("be.visible");
  });

  it("should display transaction timestamp", () => {
    cy.findByTestId("transaction-timestamp").contains(
      "(06-16-2023 04:57:05 AM +UTC)"
    );
  });

  it("should display transaction block height and redirect to block page", () => {
    const block = 12137;
    cy.findByTestId("transaction-block-title").should("have.text", "Block");
    cy.findByTestId("transaction-block")
      .should("be.visible")
      .should("have.text", block);
    cy.findByTestId("transaction-block")
      .should("have.attr", "href")
      .and("include", `/block/${block}`);
    cy.findByTestId("transaction-block").click();
    cy.location("href").should(
      "eq",
      `${Cypress.config().baseUrl}/block/${block}`
    );
  });

  it("should have number of block confirmations", () => {
    cy.findByTestId("transaction-confimations-title").should(
      "have.text",
      "Confirmation"
    );
    cy.findByTestId("transaction-confirmations")
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const values = text.split(" ");
        expect(values[0]).to.match(/\d+/);
        expect(values[1]).to.equal("blocks");
      });
  });

  it("should display transaction type and status", () => {
    cy.findByTestId("transaction-type-title").should(
      "have.text",
      "Transaction Type"
    );
    cy.findByTestId("transaction-type").should("have.text", "Contract call");
    cy.findByTestId("transaction-status-title").should("have.text", "Status");
    cy.findByTestId("transaction-status").should("have.text", "Success");
  });

  it("should display transaction amount and fee", () => {
    cy.findByTestId("transaction-amount-title").should("have.text", "Amount");
    cy.findByTestId("transaction-amount").contains("0.30000000 DFI");
    cy.findByTestId("transaction-fee-title").should(
      "have.text",
      "Transaction fee"
    );
    cy.findByTestId("transaction-fee").should("have.text", "0.00028350 DFI");
  });

  it("should display wallet details", () => {
    // From address with copy fn
    cy.findByTestId("From-title").should("have.text", "From");
    cy.findByTestId("transaction-details-from")
      .should("have.attr", "href")
      .and("include", "/address/0xC9CD1e2319C20E792f9f56f3464a44ce2ab5ED7F");
    cy.findByTestId("transaction-details-from-copied").should("not.exist");
    cy.findByTestId("copy-transaction-details-from").trigger("click");
    cy.findByTestId("transaction-details-from-copied").should("be.visible");
    // To address
    cy.findByTestId("To-title").should("have.text", "To");
    cy.findByTestId("transaction-details-to")
      .should("have.attr", "href")
      .and("include", "/address/0x3494AD49D47fbD5E845f27317A1Ab67093D7324B");
    cy.findByTestId("transaction-details-to-copied").should("not.exist");
    // TODO: Check `Document is not focused.` for svg element
    // cy.findByTestId("copy-transaction-details-to").trigger("click");
    // cy.findByTestId("transaction-details-to-copied").should("be.visible");
  });

  it("should display gas details", () => {
    cy.findByTestId("gas-detail-title").should("have.text", "Gas detail");
    // TODO: Add each gas detail
    // TODO: Test web & mobile tooltip
  });

  it("should display raw input", () => {
    cy.findByTestId("transaction-raw-input-title").should(
      "have.text",
      "Raw input"
    );
    // TODO: Add raw input textarea
  });
});

// TODO: Add context for iphone
