@ui
Feature: Tenant publishes a product

  Background:
    Given tenant owner "alice@acme.com" is signed in to "Acme Books"

  Scenario: Minimal publish flow
    When Alice creates a product "Go Fast eBook" with one PDF asset and sets price to €10
    And Alice publishes the product
    Then the product appears in the Acme storefront
    And guests can view the product detail page
