Feature: Post with comments

Scenario: Create a post 
  Given "/posts" create post endpoint
  When I use 15 user to create a post with "Testing" title and "Testing post" body
  Then 201 created response is returned and post is created with "Testing" title and "Testing post" body

Scenario: Create a comment for an existing Post
  Given "/post/{createdPost}/comments" add comment endpoint
  When I create a comment "Some comment" using my email "test@test.com" for a created post
  Then 201 created response is returned and comment is created with "Some comment" body and "test@test.com" email 

Scenario: Get created post
  Given "/posts/{createdPost}" get post endpoint
  When I search for a previously created post
  Then 200 ok response is returned 

Scenario: Get created comment
  Given "/posts/{createdPost}/comments?id={createdCommentid}" get comments endpoint
  When I search for post comments
  Then 200 ok response is returned and comment "Some comment" is returned in the api response body

Scenario: Delete a created post
  Given "/posts/{createdPost}" delete post endpoint
  When I delete a created post
  Then 200 ok response is returned and post is removed

Scenario: Try to get deleted post
  Given "/posts/{createdPost}" get post endpoind with deleted post id
  When I search for deleted post id
  Then 404 not found response is returned