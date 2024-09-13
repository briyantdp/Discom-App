/**
 * createThread spec
 * - Should display a createThread page to create a new thread correctly
 * - Should focus on title input when the form is submitted without any input
 * - Should focus on category input when the form is submitted without any input
 * - Should display toast error when the form is submitted without any input
 * - Should display toast success when the form is submitted with valid input 
*/

const threadExample = {
  title: 'Test tambah thread',
  category: 'Fitur',
  body: 'Saya sedang test fitur tambah thread menggunakan cara E2E'
}

describe('Create Thread spec', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.get('input[placeholder="Email"]').type('thomasalva@dicoding.com');
    cy.get('input[placeholder="Password"]').type('thomasalva123');
    cy.get('button').contains(/^Log In$/).click();

    cy.location('pathname').should('eq', '/');

    cy.get('a[href="/new"]').click();
    
  })

  it('Should display a createThread page to create a new thread correctly', () => {
    cy.get('input[placeholder="Judul"]').should('be.visible');
    cy.get('input[placeholder="Kategori"]').should('be.visible');
    cy.get('textarea[placeholder="Apa yang anda pikirkan ?"]').should('be.visible');
  });

  it('Should focus on title input when the form is submitted without any input', () => {
    cy.get('button[type="submit"]').click();

    cy.get('input[placeholder="Judul"]').should('be.focused');
  });

  it('Should focus on category input when the form is submitted without any input', () => {
    cy.get('input[placeholder="Judul"]').type(threadExample.title);
    
    cy.get('button[type="submit"]').click();

    cy.get('input[placeholder="Kategori"]').should('be.focused');
  });

  it('Should display toast error when the form is submitted without any input', () => {
    cy.get('input[placeholder="Judul"]').type(threadExample.title);
    cy.get('input[placeholder="Kategori"]').type(threadExample.category);
    
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"body" is not allowed to be empty');
    })
  });

  it('Should display toast success when the form is submitted with valid input', () => {
    cy.get('input[placeholder="Judul"]').type(threadExample.title);
    cy.get('input[placeholder="Kategori"]').type(threadExample.category);
    cy.get('textarea[placeholder="Apa yang anda pikirkan ?"]').type(threadExample.body);
    
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Diskusi baru berhasil ditambahkan');
    })
    cy.get('.home-page__content__threads').contains(threadExample.title);
  });
});