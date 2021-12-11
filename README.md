## Panteon Gaming Backend API

How to use:

`yarn install` or `npm install` for install dependencies

`yarn start` or `npm start` for start app


Runs the app in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


### Endpoint list: 

`GET` /players --> Get all players

`POST` /update/increase --> Update specific player's daily achievement with 'id' (for testing purposes)

`POST` /update/decrease --> Update specific player's daily achievement with 'id' (for testing purposes)

`POST` /money/increase --> Update specific player's top money with 'id' (for testing purposes)

`POST` /money/decrease --> Update specific player's top money with 'id' (for testing purposes)


### Purpose of API

After caching the user list coming from a database with high traffic 
player data with 'REDIS Cache', it distributes with the '/players' endpoint.

It monitors the user data instantly, creates a pool from the user money
on a weekly basis. It distributes rewards to the users according to the 
success ranking from the pool created.

### Broadcast Link

https://panteon-node-server.herokuapp.com/


Redis Hosting: 

redis-11803.c55.eu-central-1-1.ec2.cloud.redislabs.com


MongoDB Cloud 

mongodb+srv://panteon-data:pagbiH-cecbah-7bobdo@cluster0.o2qp5.mongodb.net/PanteonPlayersDatabase?retryWrites=true&w=majority
