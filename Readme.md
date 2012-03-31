# DevCrowd node.js workshop

## Agenda
* workshop overview - TDD, XP, Spread Idea, Time
* bacis app creation
* first test with mocha
* node package manager
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

