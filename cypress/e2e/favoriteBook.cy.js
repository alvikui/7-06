const bookFirst = {
  title: "Алмазный Огранщик",
  description:
    "Система управления бизнесом и жизнью",
  author: "Майкл Роуч",
};

const bookSecond = {
  title: "Пока-я-не-Я",
  description:
    "Практическое руководство по трансформации судьбы",
  author: "Дмитрий Троцкий",
};

describe("Избранное", () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.login("bropet@mail.ru", "123");
  });


  it("Добавить новую книгу в избранное", () => {
    cy.addFavoriteBook(bookSecond);
    cy.visit("/favorites");
    cy.get(".card-title").should("contain.text", bookSecond.title);
  });

  it("Добавить книгу в избранное из списка книг", () => {
    cy.addBookNoFavorite(bookFirst);
    cy.contains(bookFirst.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.visit("/favorites");
    cy.contains(bookFirst.title).should("be.visible");
  });

  it("Удалить книгу из избранного", () => {
    cy.visit("/favorites");
    cy.contains(bookSecond.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.contains(bookSecond.title).should("not.exist");
  });
});