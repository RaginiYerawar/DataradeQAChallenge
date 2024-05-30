class LoginPage{

    constructor(){
        this.usernameLocator = '#email'
        this.passwordLocator = '#password'
        this.loginButtonLocator = '#loginButton'
        this.errorMessageLocator = '.error'
    }

    login(username, password){
       cy.get(this.usernameLocator).type(username)
       cy.get(this.passwordLocator).type(password)
       cy.get(this.loginButtonLocator).click()
       cy.wait(1000)
    }
    verifyInvalidErrorMessage(errorMessage){
       cy.get(this.errorMessageLocator).should('contain',errorMessage)
    }
}
export default LoginPage