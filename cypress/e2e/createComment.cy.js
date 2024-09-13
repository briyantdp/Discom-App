/**
 * createComment spec
 * - Should display a comment form to create a new comment correctly
 * - Should focus on comment input when the form is submitted without any input
 * - Should display toast success and new comment when the form is submitted with valid input
*/

const commentExample = 'Test fitur komentar';

describe('Create Comment spec', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.get('input[placeholder="Email"]').type('thomasalva@dicoding.com');
    cy.get('input[placeholder="Password"]').type('thomasalva123');
    cy.get('button').contains(/^Log In$/).click();

    cy.location('pathname').should('eq', '/');

    cy.get('a[href="/threads/thread-Np47p4jhUXYhrhRn"]').click();
  })

  it('Should display a comment form to create a new comment correctly', () => {
    cy.get('.comment-form').should('be.visible');
  });

  it('Should focus on comment input when the form is submitted without any input', () => {
    cy.get('button[type="submit"]').click();

    cy.get('textarea[placeholder="Komentar anda"]').should('be.focused');
  });

  it('Should display toast success and new comment when the form is submitted with valid input', () => {
    cy.get('textarea[placeholder="Komentar anda"]').type(commentExample);
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Komentar berhasil ditambahkan');
    })

    cy.get('.comment-item').should('be.visible');
    cy.get('.comment-item').contains(commentExample);
  });
});