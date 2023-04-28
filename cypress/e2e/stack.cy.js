describe("stack page works correctly", function () {
  beforeEach(function () {
    cy.visit("/stack");
  });

  it("should disable add button with empty input", function () {
    cy.get("input").should("have.value", "");
    cy.contains("Добавить").should("have.disabled", true);
  });

  it("should add element correctly", function () {
    cy.get("input").type("10").should("have.value", "10");
    cy.contains("Добавить").click();
    cy.get('div[class^="circle_circle"').should(($div) => {
      expect($div.eq(0))
        .to.have.text("10")
        .attr("class")
        .to.match(/circle_changing__/);
    });
    cy.get('div[class*="circle_head"').should(($div) => {
      expect($div.eq(0)).to.have.text("top");
    });

    cy.wait(1000);
    cy.get('div[class^="circle_circle"').should(($div) => {
      expect($div.eq(0))
        .to.have.text("10")
        .attr("class")
        .to.match(/circle_default__/);
    });
  });

  it("should delete element correctly", function () {
    cy.get("input").type("10").should("have.value", "10");
    cy.contains("Добавить").click();
    cy.get("input").type("15").should("have.value", "15");
    cy.contains("Добавить").click();
    cy.get('div[class^="circle_circle"').should("have.length", 2);
    cy.contains("Удалить").click();
    cy.get('div[class^="circle_circle"').should("have.length", 1);
  });

  it("should clear stack correctly", function () {
    cy.get("input").type("10").should("have.value", "10");
    cy.contains("Добавить").click();
    cy.get("input").type("15").should("have.value", "15");
    cy.contains("Добавить").click();
    cy.get("input").type("20").should("have.value", "20");
    cy.contains("Добавить").click();
    cy.contains("Очистить").click();
    cy.get('div[class^="circle_circle"').should("have.length", 0);
  });
});
