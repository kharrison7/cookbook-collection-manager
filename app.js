//app.js code here.
// runs at http://localhost:3000/
// This requires all the modules and files.
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
const expressValidator = require('express-validator');
// const adminRouter = require('./public/routes/admin');
// const gameRouter = require('./public/routes/gameplay');
// const validation = require('./test/validation/checkVal.js');
// const data = require('./items.js');
// const userJS = require('./user.js');
// const file = './fill.json';
// const fileTransfer = require('./fill.json');
// Creates and includes a file system (fs) module
const fs = require('fs');
// Create authorization session
let authorizedSession = "";
// Create app
const app = express();
// Set app to use bodyParser() middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
//'extended: false' parses strings and arrays.
//'extended: true' parses nested objects
//'expressValidator' must come after 'bodyParser', since data must be parsed first!
app.use(expressValidator());

// This consolelogs a buch of actions
// app.use(logger('dev'));
app.use(cookieParser());
// Sets the view engine and router.
app.engine('mustache', mustacheExpress());
// use views folder to pick up views.
app.set('views', ['./views','./views/admin']);
// sets mustache as the view engine.
app.set('view engine', 'mustache');
// use the correct routes when callled.
// app.use('/admin', adminRouter);
// app.use('/gameplay', gameRouter);
// fetch static content from public folder.
app.use(express.static(__dirname + '/public'));


// This sets up the session.
app.use(session({
  secret: 'variant',
  // only save if user changes something.
  resave: false,
  // set to determine save to sessions.
  saveUninitialized: true
}));



// mongodb code:
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoURL = 'mongodb://localhost:27017/newdb';

let assert = require('assert');

// Use connect method to connect to the server
MongoClient.connect(mongoURL, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to mongodb server");
  db.close();
});








// This ties the file to the proper localhost.
app.listen(3000, function(){
  console.log('Started express application!')
});

// In case I want to export something later.
module.exports = app;
