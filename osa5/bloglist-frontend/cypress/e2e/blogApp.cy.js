describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to blog app:')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })
  
})

describe('Login', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      'username': 'Kalle', 
      'name': 'Kalle Ankka',
      'password': 'siideri'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login succeeds with correct credentials', function() {
    cy.contains('Log in to blog app:')
    cy.get('#login-button').click()
    cy.get('#username').type('Kalle')
    cy.get('#password').type('siideri')
    cy.get('#login-button').click()
  })
  
  it('Login fails with incorrect credentials', function() {
    cy.contains('Log in to blog app:')
    cy.get('#login-button').click()
    cy.get('#username').type('Kalle')
    cy.get('#password').type('olut')
    cy.get('#login-button').click()

  })
  
})