import { DIV_CIRCLES } from "../../src/constants/element-captions";

describe("string page works correctly", function () {
  beforeEach(function () {
    cy.visit("/recursion");
  });

  it("should disable button with empty input", function () {
    cy.get("input").should("have.value", "");
    cy.get("button").should("have.disabled", true);
  });

  it("should reverse string correctly", function () {
    cy.get("input").type("ABCD").should("have.value", "ABCD");
    cy.contains("Развернуть").click();
    // first step
    cy.get(DIV_CIRCLES).should(($div) => {
      expect($div.eq(0))
        .to.have.text("A")
        .attr("class")
        .to.match(/circle_changing__/);
      expect($div.eq(1))
        .to.have.text("B")
        .attr("class")
        .to.match(/circle_default__/);
      expect($div.eq(2))
        .to.have.text("C")
        .attr("class")
        .to.match(/circle_default__/);
      expect($div.eq(3))
        .to.have.text("D")
        .attr("class")
        .to.match(/circle_changing__/);
    });

    // second step
    cy.wait(500);
    cy.get(DIV_CIRCLES).should(($div) => {
      expect($div.eq(0))
        .to.have.text("D")
        .attr("class")
        .to.match(/circle_modified__/);
      expect($div.eq(1))
        .to.have.text("B")
        .attr("class")
        .to.match(/circle_default__/);
      expect($div.eq(2))
        .to.have.text("C")
        .attr("class")
        .to.match(/circle_default__/);
      expect($div.eq(3))
        .to.have.text("A")
        .attr("class")
        .to.match(/circle_modified__/);
    });

    // second step
    cy.wait(500);
    cy.get(DIV_CIRCLES).should(($div) => {
      expect($div.eq(0))
        .to.have.text("D")
        .attr("class")
        .to.match(/circle_modified__/);
      expect($div.eq(1))
        .to.have.text("B")
        .attr("class")
        .to.match(/circle_changing__/);
      expect($div.eq(2))
        .to.have.text("C")
        .attr("class")
        .to.match(/circle_changing__/);
      expect($div.eq(3))
        .to.have.text("A")
        .attr("class")
        .to.match(/circle_modified__/);
    });

    // last step
    cy.wait(500);
    cy.get(DIV_CIRCLES).should(($div) => {
      expect($div.eq(0))
        .to.have.text("D")
        .attr("class")
        .to.match(/circle_modified__/);
      expect($div.eq(1))
        .to.have.text("C")
        .attr("class")
        .to.match(/circle_modified__/);
      expect($div.eq(2))
        .to.have.text("B")
        .attr("class")
        .to.match(/circle_modified__/);
      expect($div.eq(3))
        .to.have.text("A")
        .attr("class")
        .to.match(/circle_modified__/);
    });
  });
});
