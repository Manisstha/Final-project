// Generated from: tests\bdd\features\login.feature
import { test } from "playwright-bdd";

test.describe('Authentication - Login', () => {

  test.beforeEach('Background', async ({ Given, page, And }) => {
    await Given('I open the application', null, { page }); 
    await And('I see the sign in page', null, { page }); 
  });
  
  test('Login with valid credentials', { tag: ['@smoke', '@authentication'] }, async ({ When, page, Then }) => { 
    await When('I sign in with email "test2@test.com" and password "Test123"', null, { page }); 
    await Then('I should be on the dashboard page', null, { page }); 
  });

  test('Login with invalid credentials', { tag: ['@negative', '@authentication'] }, async ({ When, page, Then }) => { 
    await When('I sign in with email "invalid@test.com" and password "wrongpassword"', null, { page }); 
    await Then('I should see an error message', null, { page }); 
  });

  test('Navigate to forgot password page', { tag: ['@navigation', '@authentication'] }, async ({ When, page, Then }) => { 
    await When('I click the "Forgot password?" link', null, { page }); 
    await Then('I should be on "/auth/forgot-password"', null, { page }); 
  });

  test('Navigate to sign up page', { tag: ['@navigation', '@authentication'] }, async ({ When, page, Then }) => { 
    await When('I click the "Sign up here" link', null, { page }); 
    await Then('I should be on "/auth/signup"', null, { page }); 
  });

  test('Toggle password visibility', { tag: ['@ui', '@authentication'] }, async ({ When, page, And, Then }) => { 
    await When('I fill the password field with "Test123"', null, { page }); 
    await And('I toggle password visibility to show', null, { page }); 
    await Then('the password field type should be "text"', null, { page }); 
    await When('I toggle password visibility to hide', null, { page }); 
    await Then('the password field type should be "password"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('tests\\bdd\\features\\login.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":11,"tags":["@smoke","@authentication"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I open the application","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I see the sign in page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When I sign in with email \"test2@test.com\" and password \"Test123\"","stepMatchArguments":[{"group":{"start":21,"value":"\"test2@test.com\"","children":[{"start":22,"value":"test2@test.com","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":51,"value":"\"Test123\"","children":[{"start":52,"value":"Test123","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then I should be on the dashboard page","stepMatchArguments":[]}]},
  {"pwTestLine":16,"pickleLine":16,"tags":["@negative","@authentication"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I open the application","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I see the sign in page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When I sign in with email \"invalid@test.com\" and password \"wrongpassword\"","stepMatchArguments":[{"group":{"start":21,"value":"\"invalid@test.com\"","children":[{"start":22,"value":"invalid@test.com","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":53,"value":"\"wrongpassword\"","children":[{"start":54,"value":"wrongpassword","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then I should see an error message","stepMatchArguments":[]}]},
  {"pwTestLine":21,"pickleLine":21,"tags":["@navigation","@authentication"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I open the application","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I see the sign in page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"When I click the \"Forgot password?\" link","stepMatchArguments":[{"group":{"start":12,"value":"\"Forgot password?\"","children":[{"start":13,"value":"Forgot password?","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":23,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"Then I should be on \"/auth/forgot-password\"","stepMatchArguments":[{"group":{"start":15,"value":"\"/auth/forgot-password\"","children":[{"start":16,"value":"/auth/forgot-password","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":26,"pickleLine":26,"tags":["@navigation","@authentication"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I open the application","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I see the sign in page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":27,"keywordType":"Action","textWithKeyword":"When I click the \"Sign up here\" link","stepMatchArguments":[{"group":{"start":12,"value":"\"Sign up here\"","children":[{"start":13,"value":"Sign up here","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":28,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"Then I should be on \"/auth/signup\"","stepMatchArguments":[{"group":{"start":15,"value":"\"/auth/signup\"","children":[{"start":16,"value":"/auth/signup","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":31,"pickleLine":31,"tags":["@ui","@authentication"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I open the application","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I see the sign in page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":32,"keywordType":"Action","textWithKeyword":"When I fill the password field with \"Test123\"","stepMatchArguments":[{"group":{"start":31,"value":"\"Test123\"","children":[{"start":32,"value":"Test123","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":33,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"And I toggle password visibility to show","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"Then the password field type should be \"text\"","stepMatchArguments":[{"group":{"start":34,"value":"\"text\"","children":[{"start":35,"value":"text","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":35,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"When I toggle password visibility to hide","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"Then the password field type should be \"password\"","stepMatchArguments":[{"group":{"start":34,"value":"\"password\"","children":[{"start":35,"value":"password","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end