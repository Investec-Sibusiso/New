
Feature: Oracle Login

  Scenario: Invalid login attempt
    Given user is on Oracle login page
    When user enters username "Kevin.Xaba"
    When user enters password "InvestecDemo@2026"
    Then error message should be displayed


    
  Scenario: User navigates to My Team tab
    Given user is on Oracle login page
    When user enters username "Kevin.Xaba"
    When user enters password "InvestecDemo@2026"
    Then user clicks on My Team tab
