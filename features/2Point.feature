Feature: Axa feature

Scenario: Axa test
  Given I have the following body
    | name | axa test |
    | description | this is a description |
    | startDate | yesterday |
    | endDate | now |
  And I make a POST call to the following endpoint "/api/v3/addItem"
  Then the response is 200
  And the following values are present
    | id | 893281 |
    | name | axa test |
    | description | this is a description |
    | startDate | yesterday |
    | endDate | now |