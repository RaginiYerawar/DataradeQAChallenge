Feature: Datarade - Coding Challenge

    Test suite for the OWASP Juice Shop

    Scenario: Pagination functionality does show different items per page
        Given User is on the homepage with all the items displayed
        When User click on next page
        Then Items on the next page are different from the first page

    Scenario: Change the amount of items per page does list the correct amount of items
        Given User is on homepage with default number of items per page
        When User change amount of items per page "<numberOfItemsPerPage>"
        Then Total items are correct

    Scenario: Changing the language does adjust the header ‘All products’ and the side bar menu labels
        Given Initial language is English "<englishText>"
        When User change the language to another language, e.g., Česky
        Then Header and sidebar menu labels are updated to selected language "<ceskyText>"

    Scenario: The login form does return an error message in case of invalid user password combination
        Given User is on homepage and clicks on login
        When User enters incorrect username, password "<incorrectCred>"
        Then It returns an error message "<errorMessage>"

    Scenario: The login form does return success message in case of valid user password combination
        Given User is on homepage and clicks on login
        When User enters correct username, password "<correctCred>"
        Then It returns a success message "<successMessage>"