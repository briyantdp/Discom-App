/**
 * Login spec
 * - Should display login page correctly
 * - Should display alert when email is empty
 * - Should display alert when password is empty
 * - Should display alert when email and password are wrong
 * - Should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('Should display login page correctly', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Log In$/).should('be.visible');
  });

  it('Should display alert when email is empty', () => {
    cy.get('button').contains(/^Log In$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    })
  });

  it('Should display alert when password is empty', () => {
    cy.get('input[placeholder="Email"]').type('thomasalva@dicoding.com');

    cy.get('button').contains(/^Log In$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    })
  });

  it('Should display alert when email and password are wrong', () => {
    cy.get('input[placeholder="Email"]').type('thomasalva@dicoding.com');

    cy.get('input[placeholder="Password"]').type('wrong_password');

    cy.get('button').contains(/^Log In$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Email or password is wrong');
    })
  });

  it('Should display homepage when email and password are correct', () => {
    cy.get('input[placeholder="Email"]').type('thomasalva@dicoding.com');

    cy.get('input[placeholder="Password"]').type('thomasalva123');

    cy.get('button').contains(/^Log In$/).click();

    cy.location('pathname').should('eq', '/');
  });
});