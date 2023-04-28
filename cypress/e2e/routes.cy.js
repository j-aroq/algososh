describe("routing works correctly", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("should open start page", function () {
    cy.contains("МБОУ АЛГОСОШ");
  });

  it("should open string page", function () {
    cy.get('a[href*="/recursion"]').click();
    cy.contains("Строка");
  });

  it("should open fibonacci page", function () {
    cy.get('a[href*="/fibonacci"]').click();
    cy.contains("Последовательность Фибоначчи");
  });

  it("should open sorting page", function () {
    cy.get('a[href*="/sorting"]').click();
    cy.contains("Сортировка массива");
  });

  it("should open stack page", function () {
    cy.get('a[href*="/stack"]').click();
    cy.contains("Стек");
  });

  it("should open queue page", function () {
    cy.get('a[href*="/queue"]').click();
    cy.contains("Очередь");
  });

  it("should open list page", function () {
    cy.get('a[href*="/list"]').click();
    cy.contains("Связный список");
  });
});
