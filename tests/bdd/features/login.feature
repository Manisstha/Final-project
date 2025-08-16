Feature: Authentication - Login
  As a user
  I want to sign in to the application
  So that I can access my dashboard

  Background:
    Given I open the application
    And I see the sign in page

  @smoke @authentication
  Scenario: Login with valid credentials
    When I sign in with email "test2@test.com" and password "Test123"
    Then I should be on the dashboard page

  @negative @authentication
  Scenario: Login with invalid credentials
    When I sign in with email "invalid@test.com" and password "wrongpassword"
    Then I should see an error message

  @navigation @authentication
  Scenario: Navigate to forgot password page
    When I click the "Forgot password?" link
    Then I should be on "/auth/forgot-password"

  @navigation @authentication
  Scenario: Navigate to sign up page
    When I click the "Sign up here" link
    Then I should be on "/auth/signup"

  @ui @authentication
  Scenario: Toggle password visibility
    When I fill the password field with "Test123"
    And I toggle password visibility to show
    Then the password field type should be "text"
    When I toggle password visibility to hide
    Then the password field type should be "password"
