///<reference types="Cypress" />
const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

import HomePage from "../../../support/PageObjects/HomePage";
import LoginPage from "../../../support/PageObjects/LoginPage";

let testData 
before(function () {
    cy.fixture('example').then(function (data) {
        testData = data
    })
})

const homePage = new HomePage()
const loginPage = new LoginPage()
let firstPageItems, nextPageItems
let totalItemsBeforePagination, totalItemsAfterPagination

Given('User is on the homepage with all the items displayed', () => {
    homePage.closeCookiebanners()
    // Get items displayed on the first page
    cy.wrap(null).then(() => {
        firstPageItems = homePage.getItemsDisplayed()
    })
})

When('User click on next page', () => {
    // Go to the next page
    homePage.clickOnNextPage()
    cy.wrap(null).then(() => {
        // Get items displayed on the next page
        nextPageItems = homePage.getItemsDisplayed()
    })
})

Then('Items on the next page are different from the first page', () => {
    cy.wrap(null).then(() => {
        // Assert that items on the next page are different from the first page
        expect(nextPageItems).to.not.equal(firstPageItems);
    })
})

Given('User is on homepage with default number of items per page', () => {
    cy.wrap(null).then(() => {
        return homePage.calculateTotalItems().then(totalItems => {
            totalItemsBeforePagination = totalItems;
        })
    })
})

When('User change amount of items per page {string}', ()=> {
    homePage.selectNumberOfItemsPerPage(testData.numberOfItemsPerPage)
    cy.wrap(null).then(() => {
        return homePage.calculateTotalItems().then(totalItems => {
            totalItemsAfterPagination = totalItems;
        })
    })
})

Then('Total items are correct', () => {
    cy.wrap(null).then(() => {
        expect(totalItemsBeforePagination).to.be.equal(totalItemsAfterPagination)
    })
})

Given('Initial language is English {string}', ()=> {
    // Check initial language (assuming the default language is English)
    cy.wrap(null).then(() => {
        homePage.verifyHeadingText(testData.englishText[1])
        homePage.verifyMenuOptionsText(testData.englishText[2])
    })
})

When('User change the language to another language, e.g., Česky', ()=> {
    // Change language to another language, e.g., Česky
    homePage.selectLanguage(testData.ceskyText[0])
})

Then('Header and sidebar menu labels are updated to selected language {string}', ()=> {
    // Verify the header and sidebar menu labels are updated
    cy.wrap(null).then(() => {
        homePage.verifyHeadingText(testData.ceskyText[1])
        homePage.verifyMenuOptionsText(testData.ceskyText[2])
    })
})

Given('User is on homepage and clicks on login', ()=>{
    homePage.closeCookiebanners()
    homePage.clickOnLogin()
    homePage.verifyURLContainsLogin()
})

When('User enters incorrect username, password {string}', ()=>{
    loginPage.login(testData.incorrectCred[0], testData.incorrectCred[1])
})

Then('It returns an error message {string}', ()=>{
    loginPage.verifyInvalidErrorMessage(testData.errorMessage)
})

When('User enters correct username, password {string}', ()=>{
    loginPage.login(testData.correctCred[0], testData.correctCred[1])
})

Then('It returns a success message {string}', ()=>{
    homePage.verifySuccessMessageMessage(testData.successMessage)
})