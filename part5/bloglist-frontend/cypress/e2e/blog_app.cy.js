describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const userA = {
      name: "Brian Lagranda",
      username: "blagranda",
      password: "testingapp2",
    };
    const userB =
    {
      name: "Super Testing User",
      username: "testinguser",
      password: "testingpw",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, userA);
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, userB);
    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.contains("Log in");
    cy.get("#username");
    cy.get("#password");
    cy.get("#btn-login");
  });

  describe("Login", function() {
    it("succeeds with correct credentials", function() {
      cy.contains("Log in").click();
      cy.get("#username").type("blagranda");
      cy.get("#password").type("testingapp2");
      cy.get("#btn-login").click();

      cy.contains("Brian Lagranda logged in");
    });

    it("fails with wrong credentials", function() {
      cy.contains("Log in").click();
      cy.get("#username").type("blagranda");
      cy.get("#password").type("wrongpassword");
      cy.get("#btn-login").click();

      cy.get(".error")
        .should("contain", "Error: Wrong credentials")
        .and("have.css", "color", "rgb(216, 0, 12)");
    });
  });

  describe("When logged in", function() {
    beforeEach(function() {
      cy.login({ username: "blagranda", password: "testingapp2" });
    });

    it("A blog can be created", function() {
      cy.contains("Create new blog").click();
      cy.get("#blogNewTitle").type("A new blog created by Cypress");
      cy.get("#blogNewAuthor").type("Cypress");
      cy.get("#blogNewUrl").type("www.testingCypress.com");
      cy.get("#btn-create").click();
      cy.contains("A new blog created by Cypress");
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "A blog exists",
          author: "Cypress",
          url: "www.testingCypress.com",
        });
      });

      it("can be liked", function() {
        cy.contains("A blog exists");
        cy.contains("View").click();
        cy.contains("Like").click();
      });

      it("can be deleted by the owner", function() {
        cy.contains("A blog exists");
        cy.contains("View").click();
        cy.contains("Remove").click();
      });

      it("can't be deleted by other user", function() {
        cy.login({ username: "testinguser", password: "testingpw" });
        cy.contains("A blog exists");
        cy.contains("View").click();
        cy.should("not.contain", "remove");
      });
    });

    describe("and multiple blogs exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Blog with 320 likes",
          author: "Cypress",
          url: "www.testingCypress.com",
          likes: 320,
        });
        cy.createBlog({
          title: "Blog with 100 likes",
          author: "Cypress",
          url: "www.testingCypress.com",
          likes: 100,
        });
        cy.createBlog({
          title: "Blog will be 101 likes",
          author: "Cypress",
          url: "www.testingCypress.com",
          likes: 99,
        });
        cy.createBlog({
          title: "Blog with 1500 likes",
          author: "Cypress",
          url: "www.testingCypress.com",
          likes: 1500,
        });
      });

      it("blogs are ordered by total of likes", function() {
        cy.get(".blog").eq(0).should("contain", "Blog with 1500 likes Cypress");
        cy.get(".blog").eq(1).should("contain", "Blog with 320 likes Cypress");
        cy.contains("Blog will be 101 likes Cypress")
          .contains("View").click();
        cy.contains("Like").click();
        cy.wait(1000);
        cy.contains("Like").click();
        cy.get(".blog").eq(2).should("contain", "Blog will be 101 likes Cypress");
        cy.get(".blog").eq(3).should("contain", "Blog with 100 likes Cypress");
      });
    });
  });
});