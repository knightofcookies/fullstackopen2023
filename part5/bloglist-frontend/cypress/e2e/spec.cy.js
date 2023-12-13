describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Default User',
      username: 'defaultuser',
      password: 'password'
    }
    const altUser = {
      name: 'Alt User',
      username: 'altuser',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', altUser)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.visit('http://localhost:5173')
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('Login')
  })

  describe('Login', function () {
    it('Succeeds with correct credentials', function () {
      cy.get('#username').type('defaultuser')
      cy.get('#password').type('password')
      cy.get('#loginButton').click()
      cy.contains('Logged in as Default User')
    })

    it('Fails with wrong credentials', function () {
      cy.get('#username').type('defaultuser')
      cy.get('#password').type('passwa')
      cy.get('#loginButton').click()
      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'defaultuser', password: 'password' })
      cy.createBlog({ title: 'Test Blog', author: 'Test Author', url: '123.45://' })
    })

    it('A blog can be created', function () {
      cy.get('#newBlogButton').click()
      cy.get('#blogFormTitle').type('The Picture of Dorian Gray')
      cy.get('#blogFormAuthor').type('Oscar Wilde')
      cy.get('#blogFormUrl').type('https://www.goodreads.com')
      cy.get('#addBlogButton').click()
      cy.contains('A new blog The Picture of Dorian Gray by Oscar Wilde has been added')
      cy.contains('The Picture of Dorian Gray — Oscar Wilde ')
    })

    it('A blog can be liked', function () {
      cy.contains('View').click()
      cy.contains('0')
        .contains('Like')
        .click()
      cy.contains('1')
    })

    it('A user can delete their blogs', function () {
      cy.contains('View').click()
      cy.get('.blogDeleteButton').click()
      cy.contains('Delete').should('not.exist')
    })
  })

  describe('When there are multiple users', function () {
    beforeEach(function () {
      cy.get('#username').type('altuser')
      cy.get('#password').type('password')
      cy.get('#loginButton').click()
      cy.contains('Logged in as Alt User')
    })

    it('Only the user who created the blog can delete it', function () {
      cy.get('#newBlogButton').click()
      cy.get('#blogFormTitle').type('The Picture of Dorian Gray')
      cy.get('#blogFormAuthor').type('Oscar Wilde')
      cy.get('#blogFormUrl').type('https://www.goodreads.com')
      cy.get('#addBlogButton').click()
      cy.contains('The Picture of Dorian Gray — Oscar Wilde ')

      cy.contains('Logout').click()
      cy.get('#username').type('defaultuser')
      cy.get('#password').type('password')
      cy.get('#loginButton').click()
      cy.contains('Logged in as Default User')

      cy.contains('View').click()
      cy.contains('Delete').should('not.exist')
    })

    it('Blogs are ordered by likes', function () {
      cy.get('#newBlogButton').click()
      cy.get('#blogFormTitle').type('The Picture of Dorian Gray')
      cy.get('#blogFormAuthor').type('Oscar Wilde')
      cy.get('#blogFormUrl').type('https://www.goodreads.com')
      cy.get('#addBlogButton').click()
      cy.contains('The Picture of Dorian Gray — Oscar Wilde ')

      cy.get('#newBlogButton').click()
      cy.get('#blogFormTitle').type('A Tale of Two Cities')
      cy.get('#blogFormAuthor').type('Charles Dickens')
      cy.get('#blogFormUrl').type('https://www.goodreads.com')
      cy.get('#addBlogButton').click()
      cy.contains('A Tale of Two Cities — Charles Dickens')

      cy.contains('The Picture of Dorian Gray').contains('View').click()
      cy.get('button').contains('Like').click()

      cy.get('.blogDiv').eq(0).should('contain', 'The Picture of Dorian Gray')
      cy.get('.blogDiv').eq(1).should('contain', 'A Tale of Two Cities')
    })
  })
})
