/**
 * voteButton spec
 * - Should display a voteButton (upvote and downvote) correctly
 * - Should show success toast when upvote button is clicked
 * - Should show success toast when downvote button is clicked
*/

describe('Vote Button spec', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.get('input[placeholder="Email"]').type('thomasalva@dicoding.com');
    cy.get('input[placeholder="Password"]').type('thomasalva123');
    cy.get('button').contains(/^Log In$/).click();

    cy.location('pathname').should('eq', '/');
  })

  it('Should display a voteButton (upvote and downvote) correctly', () => {
    cy.get('button.threads__upvote').should('be.visible');
    cy.get('button.threads__downvote').should('be.visible');
  });

  it('Should show success toast when upvote button is clicked', () => {
    cy.get('button.threads__upvote').click({multiple: true});

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Upvote diskusi berhasil!');
    })
    
  });

  it('Should show success toast when downvote button is clicked', () => {
    cy.get('button.threads__downvote').click({multiple: true});

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Downvote diskusi berhasil!');
    })
  });
});