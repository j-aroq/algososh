import { DIV_CIRCLES } from "../../src/constants/element-captions";

describe("fibonacci page works correctly", function () {
  beforeEach(function () {
    cy.visit("/fibonacci");
  });

  it("should disable button with empty input", function () {
    cy.get("input").should("have.value", "");
    cy.get("button").should("have.disabled", true);
  });

  it("should generate numbers correctly", function () {
    cy.get("input").type("6").should("have.value", "6");
    cy.contains("Развернуть").click();
    cy.wait(7000);
    cy.get(DIV_CIRCLES).should(($div) => {
      expect($div.eq(0)).to.have.text("1");
      expect($div.eq(1)).to.have.text("1");
      expect($div.eq(2)).to.have.text("2");
      expect($div.eq(3)).to.have.text("3");
      expect($div.eq(4)).to.have.text("5");
      expect($div.eq(5)).to.have.text("8");
      expect($div.eq(6)).to.have.text("13");
    });
  });
});
