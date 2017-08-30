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
app.set('views', './views');
// sets mustache as the view engine.
app.set('view engine', 'mustache');
// use the correct routes when callled.
// app.use('/admin', adminRouter);
// app.use('/gameplay', gameRouter);
// fetch static content from public folder.
app.use(express.static(__dirname + '/public'));
app.use('/static', express.static('static'));
// This sets up the session.
app.use(session({
  secret: 'variant',
  // only save if user changes something.
  resave: false,
  // set to determine save to sessions.
  saveUninitialized: true
}));



const Recipe = require("./models/recipe");
const Cookbook = require("./models/cookbook");

const DUPLICATE_RECORD_ERROR = 11000;

// mongodb code:
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoURL = 'mongodb://localhost:27017/cookbook';

let assert = require('assert');

// Use connect method to connect to the server
MongoClient.connect(mongoURL, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to mongodb server");
  db.close();
});

//This connects to mongoose and bluebird.
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// Replace "test" with your database name.
// mongoose.connect('mongodb://localhost:27017/test');
mongoose.connect(mongoURL, {useMongoClient: true});
app.set('layout', 'layout');














// This code is from the github:
//github.com/tiycnd/mongoose-live-code-recipes/blob/master/app.js

// app.get('/new/', function (req, res) {
//   res.render('new_recipe');
// });
//
// app.post('/new/', function (req, res) {
//   Recipe.create(req.body)
//   .then(function (recipe) {
//     res.redirect('/');
//   })
//   .catch(function (error) {
//     let errorMsg;
//     if (error.code === DUPLICATE_RECORD_ERROR) {
//       // make message about duplicate
//       errorMsg = `The recipe name "${req.body.name}" has already been used.`
//     } else {
//       errorMsg = "You have encountered an unknown error."
//     }
//     res.render('new_recipe', {errorMsg: errorMsg});
//   })
// });
//
// app.get('/:id/', function (req, res) {
//   Recipe.findOne({_id: req.params.id}).then(function (recipe) {
//     res.render("recipe", {recipe: recipe});
//   })
// })
//
// app.get('/:id/new_ingredient/', function (req, res) {
//   Recipe.findOne({_id: req.params.id}).then(function (recipe) {
//     res.render("new_ingredient", {recipe: recipe});
//   })
// })
//
// app.post('/:id/new_ingredient/', function (req, res) {
//   Recipe.findOne({_id: req.params.id}).then(function (recipe) {
//     recipe.ingredients.push(req.body);
//     recipe.save().then(function () {
//         res.render("new_ingredient", {recipe: recipe});
//     })
//   })
// })
//
// app.get('/:id/new_step/', function (req, res) {
//   Recipe.findOne({_id: req.params.id}).then(function (recipe) {
//     res.render("new_step", {recipe: recipe});
//   })
// })
//
// app.post('/:id/new_step/', function (req, res) {
//   Recipe.findOne({_id: req.params.id}).then(function (recipe) {
//     recipe.steps.push(req.body.step);
//     recipe.save().then(function () {
//       res.render("new_step", {recipe: recipe});
//     })
//   })
// })
//
// app.get('/', function (req, res) {
//   Recipe.find().then(function (recipes) {
//     res.render('index', {recipes: recipes});
//   })
// })
// End of recipes code from class




// Start of cookbook code.
// let cookbooks = Cookbook;


// sets up page routes
app.get('/add', function(req, res){
 console.log("Get Add");
 res.render('add.mustache');
});
//
// app.post('/add', function(req, res){
//   console.log("Get Add2");
//  Cookbooks.create(req.body).then(function (cookbooks){
//   res.redirect('/');
//  });
// });
//
app.get('/', function (req, res) {
  console.log("A");
  res.redirect('/index');
})

app.get('/index', function(req, res){
  console.log("B");
  Cookbook.find().then(function (cookbooks) {
  res.render('layout', {cookbooks});
})
})



// app.get('/new/', function (req, res) {
//   res.render('new_cookbook');
// });
//
// app.get('/new_cookbook', function (req, res) {
//   Cookbook.find().then(function (cookbooks) {
//     res.render('new_cookbook', {cookbooks});
//   })
// })
//
// app.post('/new_cookbook', function (req, res) {
//   Cookbook.create(req.body)
//   .then(function (cookbook) {
//     console.log("Redirect line 184 approx");
//     res.redirect('/');
//   })
//   .catch(function (error) {
//     let errorMsg;
//     if (error.code === DUPLICATE_RECORD_ERROR) {
//       // make message about duplicate
//       errorMsg = `The cookbook name "${req.body.name}" has already been used.`
//     } else {
//       errorMsg = "You have encountered an unknown error."
//     }
//     res.render('new_cookbook', {errorMsg: errorMsg});
//   })
// });
//
//








// This ties the file to the proper localhost.
app.listen(3000, function(){
  console.log('Started express application!')
});

// In case I want to export something later.
module.exports = app;
