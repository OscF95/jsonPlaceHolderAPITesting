const request = require('supertest');
const expect = require('chai').expect
const { Given, When, Then } = require('@cucumber/cucumber');

var hostURL= "https://jsonplaceholder.typicode.com";
var APIRequest = request(hostURL);

var response;
var createdPostId;
var createdCommentId;

Given('{string} create post endpoint', 
function (endpointName) {
  this.endPoint = endpointName;
});

When('I use {int} user to create a post with {string} title and {string} body', 
function (userID, postTitle, postBody) {
  return response = APIRequest
  .post(this.endPoint)
  .send({
    "title": postTitle,
    "body": postBody,
    "userId": userID
  })
});

Then('{int} created response is returned and post is created with {string} title and {string} body', 
function (responseCode, postTitle, postBody){

  return response.then(function(res){
    expect(responseCode).to.equal(res.statusCode);
    expect(postTitle).to.equal(res.body.title);
    expect(postBody).to.equal(res.body.body);

    createdPostId = res.body.id;
  });
});

Given('{string} add comment endpoint', 
function(endPointName){
  this.endPoint = endPointName.replace("{createdPost}", createdPostId);
});

When('I create a comment {string} using my email {string} for a created post', 
function(postComment, userEmail){
  return response = APIRequest
    .post(this.endPoint)
    .send({
        "email": userEmail,
        "body": postComment
      });
});

Then('{int} created response is returned and comment is created with {string} body and {string} email', 
function(responseCode, postComment, userEmail){
  return response.then(function(res){
    expect(responseCode).to.equal(res.statusCode);
    expect(postComment).to.equal(res.body.body);
    expect(userEmail).to.equal(res.body.email);
    
    createdCommentId = res.body.id;
  });
});

Given('{string} get post endpoint', 
function(endPointName){
  this.endPoint = endPointName.replace("{createdPost}", 1);
});

When('I search for a previously created post', 
function(){
  return response = APIRequest
    .get(this.endPoint)
});

Then('{int} ok response is returned', 
function(responseCode){
  return response.then(function (res){
    expect(responseCode).to.equal(res.statusCode);
  });
});

Given('{string} get comments endpoint', 
function(endPointName){
  this.endPoint = endPointName.replace("{createdPost}", createdPostId)
  .replace("{createdCommentid}", createdCommentId);
});

When('I search for post comments', 
function(){
  return response = APIRequest
    .get(this.endPoint)
});

Then('{int} ok response is returned and comment {string} is returned in the api response body', 
function(responseCode, comment){
  return response.then(function (res){
    expect(responseCode).to.equal(res.statusCode);
    expect(res.body[0]).to.include({body: comment});
  });
});

Given('{string} delete post endpoint', 
function(endPointName){
  this.endPoint = endPointName.replace("{createdPost}", createdPostId);
});

When('I delete a created post', 
function(){
  return response = APIRequest
  .delete(this.endPoint)
});

Then('{int} ok response is returned and post is removed', 
function(responseCode){
  return response.then(function (res){
    expect(responseCode).to.equal(res.statusCode);
  });
});

Given('{string} get post endpoind with deleted post id', 
function(endPointName){
  this.endPoint = endPointName.replace("{createdPost}", createdPostId);
});

When('I search for deleted post id', 
function(){
  return response = APIRequest
    .get(this.endPoint)
});

Then('{int} not found response is returned', 
function(responseCode){
  return response.then(function (res){
    expect(responseCode).to.equal(res.statusCode);
  });
});