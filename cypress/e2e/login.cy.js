describe('template spec', () => {
  beforeEach( () => {
    cy.visit('http://localhost:3000');
  });

  it('Нормальный вход', () => {
    cy.login("bropet@mail.ru", "123");
    cy.contains('Добро пожаловать bropet@mail.ru').should('be.visible');
  });

  it('Пустой email', () => {
    cy.login(null, "123");
    cy.get("#mail").then( (elemenst) => {
      expect(elemenst[0].checkValidity()).to.be.false;
      expect(elemenst[0].validationMessage).to.be.eql("Please fill out this field.");
    });
  });

  it('Пустой пароль', () => {
    cy.login("bropet@mail.ru",null);
    cy.get("#pass").then( (elemenst) => {
      expect(elemenst[0].checkValidity()).to.be.false;
      expect(elemenst[0].validationMessage).to.be.eql("Please fill out this field.");
    });
  });
});