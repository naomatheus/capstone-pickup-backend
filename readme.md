# Capstone Project for GA Software Engineering Immersive

## User Stories
### MVP User Profile
- User can CRUD profile
- User should be able to create a profile
- user can upload a profile image
- user can enter their pickup game preferences
- user can select between competitive and recreational games
- user can say whether they're novice, intermediate, or advanced player
- enter age
- enter short description (120 char)
- user profile includes event they're signed up for 

### MVP Event Setup
- User can CRUD events
- Event create includes
- time (start time, and general play time)
- location (Chicago Open API) 
- link to host's profile
- format of game 
- type of sport

- # of players (pre-populated based on sport)

<!-- - User can choose whether they're (superuser) host or not  -->
- User should be able to choose from a list of common games
- common games list will include all current events
- User can add themselves to an event
- User can add themselves to multiple events



- Event details level 1
-- type of sport
-- # of players
-- format of game 

- Event details level 2
-- number of slots available
-- ISO (in search of) 
-- Time game occurs

- super users can set up tournaments (recurring event setups)

### Stretch User Profile
- common games list will include all upcoming events
- common games list will include all past events 
- Users can upload multiple profile images



### Stretch Event Setup


## MERN Stack

## Third Party API
[Chicago Park District API]
(https://catalog.data.gov/dataset/parks-chicago-park-district-facilities/resource/fc40ddc3-5b35-433e-b519-1072fa9fdcc9)

## Endpoints
### User 
- POST '/register'
-- creates a user resource

- GET '/user/{id}' 
-- gets a user resource

- PUT/PATCH '/user/{id}'
-- updates a user resource

- DELETE '/user/{id}'
-- deletes a user resource

### Event 

- GET '/games'
-- Gets the active game resources

- GET 'user/{id}/game'
-- Gets a game resource

- GET 'user/{id}/games'
-- Gets a users' game resources

- GET 'user/{id}/game/new'
-- Gets the form that creates a game resource

- POST 'user/{id}/game/{gameId}'
-- Allows user to create a game resource

- PUT/PATCH 'user/{id}/game/{gameId}/edit'
-- Allows user to edit a game resource

- DELETE 'user/{id}/game/{gameId}/delete'
-- Allows user to delete a game resource




