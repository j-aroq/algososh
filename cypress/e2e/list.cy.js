import {
  HEAD,
  TAIL,
  DIV_CIRCLES,
  DIV_CIRCLE_HEAD,
  DIV_CIRCLE_TAIL,
  DIV_CIRCLE_SMALL,
  INPUT_FIRST,
  INPUT_LAST,
} from "../../src/constants/element-captions";

describe("list page works correctly", function () {
  beforeEach(function () {
    cy.visit("/list");
  });

  it("should disable button with empty input", function () {
    cy.get(INPUT_FIRST).should("have.value", "");
    cy.get(INPUT_LAST).should("have.value", "");

    cy.contains("Добавить в head").should("have.disabled", true);
    cy.contains("Добавить в tail").should("have.disabled", true);
    cy.contains("Добавить по индексу").should("have.disabled", true);
    cy.contains("Удалить по индексу").should("have.disabled", true);
  });

  it("should draw default list correctly", function () {
    cy.get(DIV_CIRCLES).should("have.length", 4);
    cy.get(DIV_CIRCLES).each(($div) => {
      expect($div).not.to.be.empty;
    });
    cy.get(DIV_CIRCLE_HEAD).should(($div) => {
      expect($div.eq(0)).to.have.text(HEAD);
    });

    cy.get(DIV_CIRCLE_TAIL).should(($div) => {
      expect($div.eq(3)).to.have.text(TAIL);
    });
  });

  it("should add head element correctly", function () {
    cy.get(DIV_CIRCLES).should("have.length", 4);
    cy.get(INPUT_FIRST).type("A4").should("have.value", "A4");
    cy.contains("Добавить в head").click();
    cy.get(DIV_CIRCLE_SMALL).should(($div) => {
      expect($div.eq(0))
        .to.have.text("A4")
        .attr("class")
        .to.match(/circle_changing__/);
    });

    cy.wait(500);
    cy.get(DIV_CIRCLES)
      .should("have.length", 5)
      .should(($div) => {
        expect($div.eq(0))
          .to.have.text("A4")
          .attr("class")
          .to.match(/circle_modified__/);
      });
    cy.get(DIV_CIRCLE_HEAD).should(($div) => {
      expect($div.eq(0)).to.have.text(HEAD);
      expect($div.eq(1)).to.have.text("");
    });

    cy.wait(1000);
    cy.get(DIV_CIRCLES).should(($div) => {
      expect($div.eq(0))
        .to.have.text("A4")
        .attr("class")
        .to.match(/circle_default__/);
    });
  });

  it("should add tail element correctly", function () {
    cy.get(DIV_CIRCLES).should("have.length", 4);
    cy.get(INPUT_FIRST).type("A4").should("have.value", "A4");
    cy.contains("Добавить в tail").click();
    cy.get(DIV_CIRCLE_SMALL).should(($div) => {
      expect($div.eq(0))
        .to.have.text("A4")
        .attr("class")
        .to.match(/circle_changing__/);
    });

    cy.wait(500);
    cy.get(DIV_CIRCLES)
      .should("have.length", 5)
      .should(($div) => {
        expect($div.eq(4))
          .to.have.text("A4")
          .attr("class")
          .to.match(/circle_modified__/);
      });
    cy.get(DIV_CIRCLE_TAIL).should(($div) => {
      expect($div.eq(3)).to.have.text("");
      expect($div.eq(4)).to.have.text(TAIL);
    });

    cy.wait(1000);
    cy.get(DIV_CIRCLES).should(($div) => {
      expect($div.eq(4))
        .to.have.text("A4")
        .attr("class")
        .to.match(/circle_default__/);
    });
  });

  it("should add element by index correctly", function () {
    cy.get(DIV_CIRCLES).should("have.length", 4);
    cy.get(INPUT_FIRST).type("A4").should("have.value", "A4");
    cy.get(INPUT_LAST).type("2").should("have.value", "2");
    cy.contains("Добавить по индексу").click();
    cy.get(DIV_CIRCLE_SMALL).should(($div) => {
      expect($div.eq(0))
        .to.have.text("A4")
        .attr("class")
        .to.match(/circle_changing__/);
    });
    cy.get(DIV_CIRCLES)
      .should("have.length", 5)
      .should(($div) => {
        expect($div.eq(0))
          .to.have.attr("class")
          .to.match(/circle_changing__/);
      });

    cy.wait(500);
    cy.get(DIV_CIRCLE_SMALL).should(($div) => {
      expect($div.eq(0))
        .to.have.text("A4")
        .attr("class")
        .to.match(/circle_changing__/);
    });
    cy.get(DIV_CIRCLES)
      .should("have.length", 5)
      .should(($div) => {
        expect($div.eq(1))
          .to.have.attr("class")
          .to.match(/circle_changing__/);
      });

    cy.wait(500);
    cy.get(DIV_CIRCLE_SMALL).should(($div) => {
      expect($div.eq(0))
        .to.have.text("A4")
        .attr("class")
        .to.match(/circle_changing__/);
    });
    cy.get(DIV_CIRCLES)
      .should("have.length", 5)
      .should(($div) => {
        expect($div.eq(2))
          .to.have.attr("class")
          .to.match(/circle_changing__/);
      });

    cy.wait(500);
    cy.get(DIV_CIRCLES)
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
    cy.get(DIV_CIRCLES).should(($div) => {
      expect($div.eq(2))
        .to.have.text("A4")
        .attr("class")
        .to.match(/circle_default__/);
    });
  });

  it("should delete head element correctly", function () {
    cy.get(DIV_CIRCLES).should("have.length", 4);
    cy.get(INPUT_FIRST).type("A4").should("have.value", "A4");
    cy.contains("Добавить в head").click();
    cy.get(DIV_CIRCLES).should("have.length", 5);
    cy.contains("Удалить из head").click();
    cy.get(DIV_CIRCLE_SMALL).should(($div) => {
      expect($div.eq(0))
        .to.have.text("A4")
        .attr("class")
        .to.match(/circle_changing__/);
    });

    cy.wait(1000);
    cy.get(DIV_CIRCLES).should("have.length", 4);
    cy.get(DIV_CIRCLE_HEAD).should(($div) => {
      expect($div.eq(0)).to.have.text(HEAD);
    });
  });

  it("should delete tail element correctly", function () {
    cy.get(DIV_CIRCLES).should("have.length", 4);
    cy.get(INPUT_FIRST).type("A4").should("have.value", "A4");
    cy.contains("Добавить в tail").click();
    cy.get(DIV_CIRCLES).should("have.length", 5);
    cy.contains("Удалить из tail").click();
    cy.get(DIV_CIRCLE_SMALL).should(($div) => {
      expect($div.eq(0))
        .to.have.text("A4")
        .attr("class")
        .to.match(/circle_changing__/);
    });

    cy.wait(1000);
    cy.get(DIV_CIRCLES).should("have.length", 4);
    cy.get(DIV_CIRCLE_TAIL).should(($div) => {
      expect($div.eq(3)).to.have.text(TAIL);
    });
  });

  it("should delete element by index correctly", function () {
    cy.get(DIV_CIRCLES).should("have.length", 4);

    cy.get(INPUT_FIRST).type("A4").should("have.value", "A4");
    cy.get(INPUT_LAST).type("2").should("have.value", "2");
    cy.contains("Добавить по индексу").click();
    cy.get(DIV_CIRCLES).should("have.length", 5);

    cy.get(INPUT_LAST).type("2").should("have.value", "2");
    cy.contains("Удалить по индексу").click();

    cy.get(DIV_CIRCLES).should(($div) => {
      expect($div.eq(0))
        .to.have.attr("class")
        .to.match(/circle_changing__/);
    });

    cy.wait(500);
    cy.get(DIV_CIRCLES).should(($div) => {
      expect($div.eq(1))
        .to.have.attr("class")
        .to.match(/circle_changing__/);
    });

    cy.wait(500);
    cy.get(DIV_CIRCLES).should(($div) => {
      expect($div.eq(2))
        .to.have.attr("class")
        .to.match(/circle_changing__/);
    });

    cy.wait(500);
    cy.get(DIV_CIRCLES).should(($div) => {
      expect($div.eq(2))
        .to.have.text("")
        .attr("class")
        .to.match(/circle_changing__/);
    });
    cy.get(DIV_CIRCLE_SMALL).should(($div) => {
      expect($div.eq(0))
        .to.have.text("A4")
        .attr("class")
        .to.match(/circle_changing__/);
    });

    cy.wait(1000);
    cy.get(DIV_CIRCLES)
      .should("have.length", 4)
      .each(($div) => {
        expect($div)
          .to.have.attr("class")
          .to.match(/circle_default__/);
      });
    cy.get(DIV_CIRCLE_HEAD).should(($div) => {
      expect($div.eq(0)).to.have.text(HEAD);
    });
    cy.get(DIV_CIRCLE_TAIL).should(($div) => {
      expect($div.eq(3)).to.have.text(TAIL);
    });
  });
});
