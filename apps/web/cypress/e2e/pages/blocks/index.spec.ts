context("/blocks on macbook-16", () => {
  const BASE_URL = Cypress.config().baseUrl;

  beforeEach(() => {
    cy.visit("/blocks");
    cy.viewport("macbook-16");
  });

  it("should have page header, footer and search bar", () => {
    cy.findByTestId("header-container").should("be.visible");
    cy.findByTestId("footer-container").should("be.visible");
    cy.findByTestId("search-bar-container").should("be.visible");
  });

  it("should have heading and list table container", () => {
    cy.findByTestId("blocks-list")
      .should("be.visible")
      .within(() => {
        cy.get("h1").should("have.text", "Blocks");
      });
  });

  it("should have data row with block information", () => {
    cy.findAllByTestId("mobile-block-row").should("not.exist");
    cy.findAllByTestId("desktop-block-row").should("be.visible");
    cy.findAllByTestId("desktop-block-row")
      .first()
      .within(() => {
        cy.get('[data-testid^="block-number-"]')
          .should("be.visible")
          .should("have.attr", "href")
          .and("include", "/block/");

        cy.findByTestId("block-reward")
          .should("be.visible")
          .within(() => {
            cy.get("span").eq(0).contains("Reward");
            cy.get("span").eq(1).contains("DFI");
          });

        cy.findByTestId("fee-recipient")
          .should("be.visible")
          .within(() => {
            cy.get("span").contains("Fee recipient");
            cy.get("a")
              .should("contain.text", "0x")
              .should("have.attr", "href")
              .and("include", "/address/");
          });

        cy.findByTestId("block-txs-count")
          .should("be.visible")
          .within(() => {
            cy.get("span").contains(" transactions");
          });

        cy.findByTestId("desktop-block-timeago")
          .should("be.visible")
          .within(() => {
            cy.get("span").contains(" ago");
          });
      });
  });

  it("should display pagination on top and bottom part of the page", () => {
    cy.findAllByTestId("pagination-container").should("have.length", 2); // top & bottom

    // Top pagination, test `next` pages
    cy.findAllByTestId("pagination-container").eq(0).should("be.visible");
    cy.findAllByTestId("pagination-container")
      .eq(0)
      .within(() => {
        cy.findByTestId("Pagination.Prev").should("not.exist");
        cy.findByTestId("Pagination.Next").should("be.visible");

        let nextPageLink = "";
        cy.findByTestId("page-2")
          .should("be.visible")
          .invoke("attr", "href")
          .then((value) => {
            nextPageLink = value || "";
          });
        cy.findByTestId("page-2").click();
        cy.then(() => {
          cy.location("href").should("eq", `${BASE_URL}${nextPageLink}`);
          cy.findByTestId("Pagination.Prev").should("be.visible");
        });
      });

    // Bottom pagination, test `previous` pages
    cy.findAllByTestId("pagination-container").eq(1).should("be.visible");
    cy.findAllByTestId("pagination-container")
      .eq(1)
      .within(() => {
        cy.findByTestId("Pagination.Prev").should("be.visible");
        cy.findByTestId("Pagination.Next").should("be.visible");

        let prevPageLink = "";
        cy.findByTestId("Pagination.Prev")
          .should("be.visible")
          .invoke("attr", "href")
          .then((value) => {
            prevPageLink = value || "";
          });
        cy.findByTestId("Pagination.Prev").click();
        cy.then(() => {
          cy.location("href").should("eq", `${BASE_URL}${prevPageLink}`);
          cy.findByTestId("Pagination.Prev").should("not.exist");
          cy.findByTestId("Pagination.Next").should("be.visible");
        });
      });
  });
});

context("/blocks on iphone-x", () => {
  beforeEach(() => {
    cy.visit("/blocks");
    cy.viewport("iphone-x");
  });

  it("should have page header, footer and search bar", () => {
    cy.findByTestId("header-container").should("be.visible");
    cy.findByTestId("header-openMenu").should("be.visible");
    cy.findByTestId("footer-container").should("be.visible");
    cy.findByTestId("search-bar-container").should("be.visible");
  });

  it("should have heading and list table container", () => {
    cy.findByTestId("blocks-list")
      .should("be.visible")
      .within(() => {
        cy.get("h1").should("have.text", "Blocks");
      });
  });

  it("should have data row with block information", () => {
    cy.findAllByTestId("desktop-block-row").should("not.exist");
    cy.findAllByTestId("mobile-block-row").should("be.visible");
    cy.findAllByTestId("mobile-block-row")
      .first()
      .within(() => {
        cy.get('[data-testid^="block-number-"]')
          .should("be.visible")
          .should("have.attr", "href")
          .and("include", "/block/");

        cy.findByTestId("block-reward")
          .should("be.visible")
          .within(() => {
            cy.get("span").eq(0).contains("Reward");
            cy.get("span").eq(1).contains("DFI");
          });

        cy.findByTestId("fee-recipient")
          .should("be.visible")
          .within(() => {
            cy.get("span").contains("Fee recipient");
            cy.get("a")
              .should("contain.text", "0x")
              .should("have.attr", "href")
              .and("include", "/address/");
          });

        cy.findByTestId("block-txs-count")
          .should("be.visible")
          .within(() => {
            cy.get("span").contains(" transactions");
          });

        cy.findByTestId("mobile-block-timeago")
          .should("be.visible")
          .within(() => {
            cy.get("span").contains(" ago");
          });
      });
  });

  it("should display pagination on top and bottom part of the page", () => {
    cy.findAllByTestId("pagination-container").should("have.length", 2); // top & bottom
    cy.findAllByTestId("pagination-container").eq(0).should("be.visible");
    cy.findAllByTestId("pagination-container").eq(1).should("be.visible");
  });
});
