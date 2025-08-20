@ui @smoke
Feature: Buy a digital product and get a license

  Background:
    Given a tenant "Acme Books" with a published product "Go Fast eBook" priced at €10
    And a buyer "bo@example.com" with an empty cart

  Scenario: Successful payment issues license and download
    When the buyer adds "Go Fast eBook" to cart and checks out successfully
    Then an order is recorded for "Acme Books" totaling €10
    And a license is issued for "Go Fast eBook" to "bo@example.com"
    And a secure download link is created and emailed to the buyer
    And the buyer can download the file once using the link

  Scenario: Failed payment leaves cart recoverable
    When the buyer's payment is declined
    Then no order is created
    And no license or download link is created
    And the cart remains with the item
