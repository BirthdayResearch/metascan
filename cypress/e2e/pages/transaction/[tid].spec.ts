context("/tx/[tid] on macbook-16", () => {
  // TODO: Replace with mainnet transaction id
  const txHash =
    "0x45496f046c1c33569860bf3950db2d7edf9706b9ee16bc566a20d2febe90af7e";

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
      "Transaction type"
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
    // From address
    cy.findByTestId("from-title").should("have.text", "From");
    cy.findByTestId("transaction-details-from")
      .should("have.attr", "href")
      .and("include", "/address/0xC9CD1e2319C20E792f9f56f3464a44ce2ab5ED7F");
    cy.findByTestId("transaction-details-from-copied").should("not.exist");
    cy.findByTestId("copy-transaction-details-from").trigger("click");
    cy.findByTestId("transaction-details-from-copied").should("be.visible");
    // To address
    cy.findByTestId("to-title").should("have.text", "To");
    cy.findByTestId("transaction-details-to")
      .should("have.attr", "href")
      .and("include", "/address/0x3494AD49D47fbD5E845f27317A1Ab67093D7324B");
    cy.findByTestId("transaction-details-to-copied").should("not.exist");
  });

  it("should display gas details", () => {
    cy.findByTestId("gas-detail-title").should("have.text", "Gas detail");
    cy.findByTestId("gas-price-title").should("have.text", "Gas price");
    cy.findByTestId("gas-price").should("have.text", "13.5 Gwei");
    cy.findByTestId("gas-limit-title").should("have.text", "Gas limit");
    cy.findByTestId("gas-limit").should("have.text", "21,000");
    cy.findByTestId("gas-used-by-txn-title").should(
      "have.text",
      "Gas used by txn"
    );
    cy.findByTestId("gas-used").should("have.text", "21,000");
    cy.findByTestId("gas-used-percentage").should("have.text", "100.00%");
    cy.findByTestId("nonce-title").should("have.text", "Nonce");
    cy.findByTestId("nonce").should("have.text", "2");
    cy.findByTestId("position-in-block-title").should(
      "have.text",
      "Position in block"
    );
    cy.findByTestId("position").should("have.text", "1");
    cy.findByTestId("desktop-tooltip-gas-price").should("be.visible");
    cy.findByTestId("desktop-tooltip-gas-limit").should("be.visible");
    cy.findByTestId("desktop-tooltip-gas-used-by-txn").should("be.visible");
    cy.findByTestId("desktop-tooltip-nonce").should("be.visible");
    cy.findByTestId("desktop-tooltip-position-in-block").should("be.visible");
  });

  it("should display raw input", () => {
    cy.findByTestId("transaction-raw-input-title").should(
      "have.text",
      "Raw input"
    );
    cy.findByTestId("hex-btn").should("have.text", "Hex (Default)");
    cy.findByTestId("transaction-hex").should("have.text", "0x");
    cy.findByTestId("utf-8-btn").should("have.text", "UTF-8");
    cy.findByTestId("utf-8-btn").click();
    cy.findByTestId("transaction-hex")
      .should("be.visible")
      .should("have.text", "");
  });
});

context("/tx/[tid] on iphone-x", () => {
  const txHash =
    "0x45496f046c1c33569860bf3950db2d7edf9706b9ee16bc566a20d2febe90af7e";

  beforeEach(() => {
    cy.visit(`/tx/${txHash}`);
    cy.viewport("iphone-x");
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
      "Transaction type"
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
    // From address
    cy.findByTestId("from-title").should("have.text", "From");
    cy.findByTestId("transaction-details-from")
      .should("have.attr", "href")
      .and("include", "/address/0xC9CD1e2319C20E792f9f56f3464a44ce2ab5ED7F");
    cy.findByTestId("transaction-details-from-copied").should("not.exist");
    cy.findByTestId("copy-transaction-details-from").trigger("click");
    cy.findByTestId("transaction-details-from-copied").should("be.visible");
    // To address
    cy.findByTestId("to-title").should("have.text", "To");
    cy.findByTestId("transaction-details-to")
      .should("have.attr", "href")
      .and("include", "/address/0x3494AD49D47fbD5E845f27317A1Ab67093D7324B");
    cy.findByTestId("transaction-details-to-copied").should("not.exist");
  });

  it("should display gas details", () => {
    cy.findByTestId("gas-detail-title").should("have.text", "Gas detail");
    cy.findByTestId("gas-price-title").should("have.text", "Gas price");
    cy.findByTestId("gas-price").should("have.text", "13.5 Gwei");
    cy.findByTestId("gas-limit-title").should("have.text", "Gas limit");
    cy.findByTestId("gas-limit").should("have.text", "21,000");
    cy.findByTestId("gas-used-by-txn-title").should(
      "have.text",
      "Gas used by txn"
    );
    cy.findByTestId("gas-used").should("have.text", "21,000");
    cy.findByTestId("gas-used-percentage").should("have.text", "100.00%");
    cy.findByTestId("nonce-title").should("have.text", "Nonce");
    cy.findByTestId("nonce").should("have.text", "2");
    cy.findByTestId("position-in-block-title").should(
      "have.text",
      "Position in block"
    );
    cy.findByTestId("position").should("have.text", "1");
    cy.findByTestId("mobile-tooltip-gas-price").should("be.visible");
    cy.findByTestId("mobile-tooltip-gas-limit").should("be.visible");
    cy.findByTestId("mobile-tooltip-gas-used-by-txn").should("be.visible");
    cy.findByTestId("mobile-tooltip-nonce").should("be.visible");
    cy.findByTestId("mobile-tooltip-position-in-block").should("be.visible");
  });

  it("should display raw input", () => {
    cy.findByTestId("transaction-raw-input-title").should(
      "have.text",
      "Raw input"
    );
    cy.findByTestId("hex-btn").should("have.text", "Hex (Default)");
    cy.findByTestId("transaction-hex").should("have.text", "0x");
    cy.findByTestId("utf-8-btn").should("have.text", "UTF-8");
    cy.findByTestId("utf-8-btn").click();
    cy.findByTestId("transaction-hex")
      .should("be.visible")
      .should("have.text", "");
  });
});
