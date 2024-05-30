class HomePage {

    constructor() {
        this.cookieButtonLocator = '.cc-btn'
        this.welcomeDismissButtonLocatorText = 'Dismiss'
        this.accountButtonLocator = '#navbarAccount'
        this.loginButtonLocator = '#navbarLoginButton'
        this.headingAllProductsLocator = '.heading.mat-elevation-z6 > div.ng-star-inserted'
        this.menuTextLocator = 'menu'
        this.menuOptionContactLocator = 'h3:nth-child(5)'
        this.languageSelectorTextLocator = 'language'
        this.totalItemsLocator = '.mat-paginator-range-label'
        this.paginatorDropdownLocator = '.mat-select-arrow-wrapper'
        this.itemsLocator = '.item-name'
        this.nextPageLocator = '.mat-paginator-navigation-next'
        this.successMessageLocator = '.accent-notification > div:nth-child(1)'
    }

    closeCookiebanners() {
        cy.get(this.cookieButtonLocator).click()
        cy.contains(this.welcomeDismissButtonLocatorText).click()
    }

    clickOnLogin() {
        cy.get(this.accountButtonLocator).click()
        cy.get(this.loginButtonLocator).click()
    }

    verifySuccessMessageMessage(expectedMessage){
        let arrayMessage = []
        cy.get(this.successMessageLocator).each((el, index) => {
            // Push the trimmed text of each element into the array
            arrayMessage.push(el.text().trim());
          }).then(() => {
            // Verify entire message with expected message
            expect(arrayMessage).to.deep.equal(expectedMessage);
          });
    }

    verifyURLContainsLogin() {
        cy.url().should('include', 'login')
    }

    selectLanguage(expectedLanguage) {
        cy.contains(this.languageSelectorTextLocator).click({ force: true })
        cy.contains(expectedLanguage).click({ force: true })
    }

    verifyHeadingText(expectedHeadingText) {
        cy.get(this.headingAllProductsLocator).should('contain.text', expectedHeadingText)
    }

    verifyMenuOptionsText(expectedMenuText) {
        cy.contains(this.menuTextLocator).click({ force: true })
        cy.get(this.menuOptionContactLocator).should('contain.text', expectedMenuText)
    }

    selectNumberOfItemsPerPage(itemsPerPage){
        cy.get(this.paginatorDropdownLocator).click({force: true})
        cy.contains(itemsPerPage).click({force: true})
    }

    calculateTotalItems() {
        return cy.get(this.totalItemsLocator).then((element) => {
            const text = element.text()
            const totalItems = text.split('of')[1].trim()
            return cy.wrap(parseInt(totalItems, 10))
          })
    }

    getItemsDisplayed(){
        return cy.get(this.itemsLocator).invoke('text').then(text => {
            const items = text.trim().split('\n');
            return cy.wrap(items)
        })
    }

    clickOnNextPage(){
        cy.get(this.nextPageLocator).click({ force: true })
    }
}
export default HomePage
