describe("list page works correctly", function () {
  beforeEach(function () {
    cy.visit("/list");
  });

  it("should disable button with empty input", function () {
    cy.get("input:first").should("have.value", "");
    cy.get("input:last").should("have.value", "");

    cy.contains("Добавить в head").should("have.disabled", true);
    cy.contains("Добавить в tail").should("have.disabled", true);
    cy.contains("Добавить по индексу").should("have.disabled", true);
    cy.contains("Удалить по индексу").should("have.disabled", true);
  });

  it("should draw default list correctly", function () {
    cy.get('div[class^="circle_circle"').should("have.length", 4);
    cy.get('div[class^="circle_circle"').each(($div) => {
      expect($div).not.to.be.empty;
    });
    cy.get('div[class*="circle_head"').should(($div) => {
      expect($div.eq(0)).to.have.text("head");
    });

    cy.get('div[class*="circle_tail"').should(($div) => {
      expect($div.eq(3)).to.have.text("tail");
    });
  });

  it("should add head element correctly", function () {
    cy.get('div[class^="circle_circle"').should("have.length", 4);
    cy.get("input:first").type("A4").should("have.value", "A4");
    cy.contains("Добавить в head").click();
    cy.get('div[class*="circle_small"').should(($div) => {
      expect($div.eq(0))
        .to.have.text("A4")
        .attr("class")
        .to.match(/circle_changing__/);
    });

    cy.wait(500);
    cy.get('div[class^="circle_circle"')
      .should("have.length", 5)
      .should(($div) => {
        expect($div.eq(0))
          .to.have.text("A4")
          .attr("class")
          .to.match(/circle_modified__/);
      });
    cy.get('div[class*="circle_head"').should(($div) => {
      expect($div.eq(0)).to.have.text("head");
      expect($div.eq(1)).to.have.text("");
    });

    cy.wait(1000);
    cy.get('div[class^="circle_circle"').should(($div) => {
      expect($div.eq(0))
        .to.have.text("A4")
        .attr("class")
        .to.match(/circle_default__/);
    });
  });

  it("should add tail element correctly", function () {
    cy.get('div[class^="circle_circle"').should("have.length", 4);
    cy.get("input:first").type("A4").should("have.value", "A4");
    cy.contains("Добавить в tail").click();
    cy.get('div[class*="circle_small"').should(($div) => {
      expect($div.eq(0))
        .to.have.text("A4")
        .attr("class")
        .to.match(/circle_changing__/);
    });

    cy.wait(500);
    cy.get('div[class^="circle_circle"')
      .should("have.length", 5)
      .should(($div) => {
        expect($div.eq(4))
          .to.have.text("A4")
          .attr("class")
          .to.match(/circle_modified__/);
      });
    cy.get('div[class*="circle_tail"').should(($div) => {
      expect($div.eq(3)).to.have.text("");
      expect($div.eq(4)).to.have.text("tail");
    });

    cy.wait(1000);
    cy.get('div[class^="circle_circle"').should(($div) => {
      expect($div.eq(4))
        .to.have.text("A4")
        .attr("class")
        .to.match(/circle_default__/);
    });
  });

  it("should add element by index correctly", function () {
    cy.get('div[class^="circle_circle"').should("have.length", 4);
    cy.get("input:first").type("A4").should("have.value", "A4");
    cy.get("input:last").type("2").should("have.value", "2");
    cy.contains("Добавить по индексу").click();
    cy.get('div[class*="circle_small"').should(($div) => {
      expect($div.eq(0))
        .to.have.text("A4")
        .attr("class")
        .to.match(/circle_changing__/);
    });
    cy.get('div[class^="circle_circle"')
      .should("have.length", 5)
      .should(($div) => {
        expect($div.eq(0))
          .to.have.attr("class")
          .to.match(/circle_changing__/);
      });

    cy.wait(500);
    cy.get('div[class*="circle_small"').should(($div) => {
      expect($div.eq(0))
        .to.have.text("A4")
        .attr("class")
        .to.match(/circle_changing__/);
    });
    cy.get('div[class^="circle_circle"')
      .should("have.length", 5)
      .should(($div) => {
        expect($div.eq(1))
          .to.have.attr("class")
          .to.match(/circle_changing__/);
      });

    cy.wait(500);
    cy.get('div[class*="circle_small"').should(($div) => {
      expect($div.eq(0))
        .to.have.text("A4")
        .attr("class")
        .to.match(/circle_changing__/);
    });
    cy.get('div[class^="circle_circle"')
      .should("have.length", 5)
      .should(($div) => {
        expect($div.eq(2))
          .to.have.attr("class")
          .to.match(/circle_changing__/);
      });

    cy.wait(500);
    cy.get('div[class^="circle_circle"')
      .should("have.length", 5)
      .should(($div) => {
        expect($div.eq(0))
          .to.have.attr("class")
          .to.match(/circle_default__/);
        expect($div.eq(1))
          .to.have.attr("class")
          .to.match(/circle_default__/);
        expect($div.eq(2))
          .to.have.text("A4")
          .attr("class")
          .to.match(/circle_modified__/);
        expect($div.eq(3))
          .to.have.attr("class")
          .to.match(/circle_default__/);
      });

    cy.wait(1000);
    cy.get('div[class^="circle_circle"').should(($div) => {
      expect($div.eq(2))
        .to.have.text("A4")
        .attr("class")
        .to.match(/circle_default__/);
    });
  });

  it("should delete head element correctly", function () {
    cy.get('div[class^="circle_circle"').should("have.length", 4);
    cy.get("input:first").type("A4").should("have.value", "A4");
    cy.contains("Добавить в head").click();
    cy.get('div[class^="circle_circle"').should("have.length", 5);
    cy.contains("Удалить из head").click();
    cy.get('div[class*="circle_small"').should(($div) => {
      expect($div.eq(0))
        .to.have.text("A4")
        .attr("class")
        .to.match(/circle_changing__/);
    });

    cy.wait(1000);
    cy.get('div[class^="circle_circle"').should("have.length", 4);
    cy.get('div[class*="circle_head"').should(($div) => {
      expect($div.eq(0)).to.have.text("head");
    });
  });

  it("should delete tail element correctly", function () {
    cy.get('div[class^="circle_circle"').should("have.length", 4);
    cy.get("input:first").type("A4").should("have.value", "A4");
    cy.contains("Добавить в tail").click();
    cy.get('div[class^="circle_circle"').should("have.length", 5);
    cy.contains("Удалить из tail").click();
    cy.get('div[class*="circle_small"').should(($div) => {
      expect($div.eq(0))
        .to.have.text("A4")
        .attr("class")
        .to.match(/circle_changing__/);
    });

    cy.wait(1000);
    cy.get('div[class^="circle_circle"').should("have.length", 4);
    cy.get('div[class*="circle_tail"').should(($div) => {
      expect($div.eq(3)).to.have.text("tail");
    });
  });

  it("should delete element by index correctly", function () {
    cy.get('div[class^="circle_circle"').should("have.length", 4);

    cy.get("input:first").type("A4").should("have.value", "A4");
    cy.get("input:last").type("2").should("have.value", "2");
    cy.contains("Добавить по индексу").click();
    cy.get('div[class^="circle_circle"').should("have.length", 5);

    cy.get("input:last").type("2").should("have.value", "2");
    cy.contains("Удалить по индексу").click();

    cy.get('div[class^="circle_circle"').should(($div) => {
      expect($div.eq(0))
        .to.have.attr("class")
        .to.match(/circle_changing__/);
    });

    cy.wait(500);
    cy.get('div[class^="circle_circle"').should(($div) => {
      expect($div.eq(1))
        .to.have.attr("class")
        .to.match(/circle_changing__/);
    });

    cy.wait(500);
    cy.get('div[class^="circle_circle"').should(($div) => {
      expect($div.eq(2))
        .to.have.attr("class")
        .to.match(/circle_changing__/);
    });

    cy.wait(500);
    cy.get('div[class^="circle_circle"').should(($div) => {
      expect($div.eq(2))
        .to.have.text("")
        .attr("class")
        .to.match(/circle_changing__/);
    });
    cy.get('div[class*="circle_small"').should(($div) => {
      expect($div.eq(0))
        .to.have.text("A4")
        .attr("class")
        .to.match(/circle_changing__/);
    });

    cy.wait(1000);
    cy.get('div[class^="circle_circle"')
      .should("have.length", 4)
      .each(($div) => {
        expect($div)
          .to.have.attr("class")
          .to.match(/circle_default__/);
      });
    cy.get('div[class*="circle_head"').should(($div) => {
      expect($div.eq(0)).to.have.text("head");
    });
    cy.get('div[class*="circle_tail"').should(($div) => {
      expect($div.eq(3)).to.have.text("tail");
    });
  });
});
