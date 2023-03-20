const blog = {
  title: 'The fondness of Ruka',
  author: 'Ihku',
  url: 'ruka.com'
}
const user = {
  username: 'Kalle', 
  name: 'Kalle Ankka', 
  password: 'siideri' 
}

describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})

describe('Blog app front page', function() {
  beforeEach(function() {
    cy.testReset()
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to blog app:')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })
  
})

describe('Login functionality', function() {
  beforeEach(function() {
    cy.testReset()
    cy.createUser({ 
      username: user.username, 
      name: user.name, 
      password: user.password 
    })
    cy.visit('')
  })

  it('Login fails with incorrect credentials', function() {
    cy.contains('Log in to blog app:')
    cy.get('#login-button').click()
    cy.get('#username').type(user.username)
    cy.get('#password').type('wrongpassword')
    cy.get('#login-button').click()
    cy.get('.error')
      .contains('wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    cy.contains('User logged in:').should('not.exist')
    cy.contains('#logout').should('not.exist')
  })

  it('Login succeeds with correct credentials', function() {
    cy.contains('Log in to blog app:')
    cy.get('#login-button').click()
    cy.get('#username').type(user.username)
    cy.get('#password').type(user.password)
    cy.get('#login-button').click()
    cy.contains('User logged in:')
    cy.get('#logout-button')
  })
  
})

describe('When logged in', function() {
  beforeEach(function() {
    cy.testReset()
    cy.createUser({ 
      username: user.username, 
      name: user.name, 
      password: user.password 
    })
    cy.login({ 
      username: user.username, 
      password: user.password })
    cy.visit('')
  })

  it('A blog can be created and the title & author are shown after creation', function() {
    cy.contains('Create blog').click()
    cy.get('#title').type(blog.title)
    cy.get('#author').type(blog.author)
    cy.get('#url').type(blog.url)
    cy.get('#submit-add-blog').click()

    cy.get('.success')
    .and('have.css', 'color', 'rgb(0, 128, 0)')
    .and('have.css', 'border-style', 'solid')
    cy.contains(blog.title)
    cy.contains(blog.author)
  })

  it('Created blog contains all information when opened', function() {
    cy.contains('Create blog').click()
    cy.get('#title').type(blog.title)
    cy.get('#author').type(blog.author)
    cy.get('#url').type(blog.url)
    cy.get('#submit-add-blog').click()

    cy.get('.success')
      .and('have.css', 'color', 'rgb(0, 128, 0)')
      .and('have.css', 'border-style', 'solid')
    cy.get('#blog-view').click()
    cy.contains(blog.title)
    cy.contains(blog.author)
    cy.contains(blog.url)
    cy.contains('likes: ')
    cy.get('#blog-user')
      .contains(user.name)
    cy.get('#blog-add-like')
    cy.get('#blog-delete')
  })
  
})

describe('After creating a new blog', function() {
  beforeEach(function() {
    cy.testReset()
    cy.createUser({ 
      username: user.username, 
      name: user.name, 
      password: user.password 
    })
    cy.login({ 
      username: user.username, 
      password: user.password }) 
    cy.createBlog({ 
      title: blog.title,
      author: blog.author,
      url: blog.url })

    cy.visit('')
    cy.contains(blog.title)
    cy.contains(blog.author)
  })

  it('A blog can be liked', function() {
    cy.get('#blog-view').click()
    cy.contains('likes: 0')
    cy.get('#blog-add-like').click()
    cy.contains('likes: 1')
    cy.get('#blog-add-like').click()
    cy.contains('likes: 2')
  })

  it('Blog creator can delete blog', function() {
    cy.get('#blog-view').click()
    cy.get('#blog-delete').click()
    cy.get('.success')
    .contains(`Deleted blog "${blog.title}" by "${blog.author}"`)
    .and('have.css', 'color', 'rgb(0, 128, 0)')
    .and('have.css', 'border-style', 'solid')
    cy.contains(blog.title).should('not.exist')
    cy.contains(blog.author).should('not.exist')
  })
  
})