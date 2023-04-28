describe("queue page works correctly", function () {
  beforeEach(function () {
    cy.visit("/queue");
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
      expect($div.eq(0)).to.have.text("head");
    });
    cy.get('div[class*="circle_tail"').should(($div) => {
      expect($div.eq(0)).to.have.text("tail");
    });

    cy.wait(1000);
    cy.get('div[class^="circle_circle"').should(($div) => {
      expect($div.eq(0))
        .to.have.text("10")
        .attr("class")
        .to.match(/circle_default__/);
    });

    cy.get("input").type("15").should("have.value", "15");
    cy.contains("Добавить").click();
    cy.get('div[class^="circle_circle"').should(($div) => {
      expect($div.eq(0))
        .to.have.text("10")
        .attr("class")
        .to.match(/circle_default__/);
      expect($div.eq(1))
        .to.have.text("15")
        .attr("class")
        .to.match(/circle_changing__/);
    });
    cy.get('div[class*="circle_head"').should(($div) => {
      expect($div.eq(0)).to.have.text("head");
      expect($div.eq(1)).to.have.text("");
    });
    cy.get('div[class*="circle_tail"').should(($div) => {
      expect($div.eq(0)).to.have.text("");
      expect($div.eq(1)).to.have.text("tail");
    });

    cy.wait(1000);
    cy.get('div[class^="circle_circle"').should(($div) => {
      expect($div.eq(0))
        .to.have.text("10")
        .attr("class")
        .to.match(/circle_default__/);
      expect($div.eq(1))
        .to.have.text("15")
        .attr("class")
        .to.match(/circle_default__/);
    });
  });

  it("should delete element correctly", function () {
    cy.get("input").type("10").should("have.value", "10");
    cy.contains("Добавить").click();
    cy.get("input").type("15").should("have.value", "15");
    cy.contains("Добавить").click();
    cy.get("input").type("20").should("have.value", "20");
    cy.contains("Добавить").click();
    cy.contains("Удалить").click();
    cy.get('div[class^="circle_circle"').should(($div) => {
      expect($div.eq(0)).to.have.text("");
      expect($div.eq(1)).to.have.text("15");
      expect($div.eq(2)).to.have.text("20");
    });
    cy.get('div[class*="circle_head"').should(($div) => {
      expect($div.eq(1)).to.have.text("head");
      expect($div.eq(2)).to.have.text("");
    });
    cy.get('div[class*="circle_tail"').should(($div) => {
      expect($div.eq(1)).to.have.text("");
      expect($div.eq(2)).to.have.text("tail");
    });
  });

  it("should clear queue correctly", function () {
    cy.get("input").type("10").should("have.value", "10");
    cy.contains("Добавить").click();
    cy.get("input").type("15").should("have.value", "15");
    cy.contains("Добавить").click();
    cy.get("input").type("20").should("have.value", "20");
    cy.contains("Добавить").click();
    cy.contains("Очистить").click();
    cy.get('div[class^="circle_circle"').each(($div) => {
      expect($div).to.have.text("");
    });
  });
});
