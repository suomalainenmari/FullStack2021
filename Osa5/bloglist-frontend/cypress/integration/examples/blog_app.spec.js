describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'beda',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#login-form')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('beda')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('beda')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')

    })

  })

  describe ('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('beda')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {

      cy.contains('New blog').click()
      cy.get('#title').type('Cypress testit blogi')
      cy.get('#author').type('Mardis Laine')
      cy.get('#url').type('www.cypresstesti.fi')
      cy.get('#createBlog').click()

      cy.contains('Cypress testit blogi')
      cy.contains('Mardis Laine')
    })

    it('A blog can be liked', function() {

      cy.contains('New blog').click()
      cy.get('#title').type('Cypress testit blogi')
      cy.get('#author').type('Mardis Laine')
      cy.get('#url').type('www.cypresstesti.fi')
      cy.get('#createBlog').click()

      cy.contains('Cypress testit blogi')
      cy.contains('Mardis Laine')

      cy.get('#view').click()
      cy.get('#like').click()
      cy.contains('Likes: 1')
    })


  })
  describe('Delete blog', function () {
    beforeEach(function() {
      cy.get('#username').type('beda')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('New blog').click()
      cy.get('#title').type('Cypress testit blogi')
      cy.get('#author').type('Mardis Laine')
      cy.get('#url').type('www.cypresstesti.fi')
      cy.get('#createBlog').click()

      cy.contains('Cypress testit blogi')
      cy.contains('Mardis Laine')
    })

    it('A blog can be deleted', function() {
      //Another blog needs to be added so the token can be set maybe?
      cy.addBlog({
        title: 'En onnistunut poistamaan blogia ilman että luon toisen, onko tokenin arvoon liittyvä asia?',
        author: 'Toinen yritys',
        url: 'www.addthistodeletethat.fi',
        likes: 0
      })


      cy.contains('view').click()
      cy.contains('delete').click()
      cy.get('html').should('not.contain', 'Cypress testit blogi')
    })

  })

})

