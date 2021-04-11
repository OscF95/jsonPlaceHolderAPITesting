const request = require('supertest');
const expect = require('chai').expect
const { Given, When, Then } = require('@cucumber/cucumber');

var hostURL= "https://endpoint.com";
var APIRequest = request(hostURL);
var responseBody;

Given('I have the following body', function (dataTable) {
  this.requestBody = dataTable.rowsHash();
});

When('I make a POST call to the following endpoint {string}', 
function(endpoint){
  return response = APIRequest
    .post(endpoint)
    .send(this.requestBody)
});

Then('the response is {int}', function (responseCode) {
  return response.then(function(res){
    expect(responseCode).to.equal(res.statusCode);
    responseBody = res.body;
  });
});

Then('the following values are present', function (dataTable) {
  let responseBodyExpected = dataTable.rowsHash();
  expect(responseBody).to.include(responseBodyExpected);
});