# DevCrowd node.js workshop

## Agenda
* workshop overview - TDD, XP, Spread Idea, Time
* bacis app creation - node package manager
* first test with mocha
* refactoring - remove routes module
* mongodb support
* home page and registration

## Bacis app creation - #step0

Install express package
        
        npm install express
        
Create simple app with sessions support

        node_modules/express/bin/express --sessions
        
Install missing dependencies

        npm install
        
Start app

        node app.js
        
then open browser and go to localhost:3000

## First test with mocha - #step1
Install dependencies

        npm install request --save
        npm install should --save

Write simple test - see tests/test_api.js
Run test

        node_modules/.bin/mocha -R spec tests/test_api.js

TIP: there is special module for node.js to app 'hot reload' - to use it run

        npm install supervisor -g
        supervisor app.js

## Refactoring - remove route module - #step2
Before do refactoring create test to check / response.
Next change code base and check if test pass.

## Add redis session support - #step3
Add redis node module

        npm install connect-redis --save

Create database dir structure

        mkdir -p db/data
        mkdir -p db/conf
        mkdir -p db/logs

Copy db/conf/redis.conf example and
run redis

        redis-server ./db/conf/redis.conf &

Then restart app.js and run tests
