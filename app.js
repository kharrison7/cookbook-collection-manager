const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');
const port = 3000;
const Cookbooks = require('./models/cookbooks');
const mongoURL = 'mongodb://localhost:27017/cookbooks';
mongoose.connect(mongoURL, {useMongoClient: true});
mongoose.Promise = require('bluebird');
// Got the following from:
//www.w3schools.com/nodejs/nodejs_mongodb_delete.asp
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');
app.use('/static', express.static('static'));
// setting up all routes to pages
const getCookBook = function(req, res, next) {
    Cookbooks.findOne({_id: req.params.id}, req.body).then(function(cookbooks) {
        req.cookbooks = cookbooks;
        console.log(req.cookbooks);
        next();
    })
};
app.get('/add', function(req, res){
  console.log("a");
 res.render('add');
});
app.post('/add', function(req, res){
  console.log("b");
 Cookbooks.create(req.body).then(function (cookbooks){
  res.redirect('/');
 });
});
app.get('/', function(req, res){
  console.log("c");
 Cookbooks.find().then(function (cookbooks){
  res.render('layout', {cookbooks: cookbooks});
 });
});
app.get('/remove', function(req, res){
  console.log("d");
 Cookbooks.find().then(function (cookbooks){
  res.render('remove', {cookbooks: cookbooks});
 });
});
app.post('/remove', function(req, res){
  console.log("e");
  MongoClient.connect(mongoURL, function(err, db) {
    if (err) throw err;
  let myquery = {title: req.body.title};
  db.collection("cookbooks").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
  });
  });
  res.redirect('/');
});
app.get('/:id/new_recipe', function(req, res){
  console.log("f");
  Cookbooks.findOne({_id: req.params.id}).then(function (cookbooks){
  res.render('new_recipe', {cookbooks: cookbooks});
 });
});
app.post('/:id/new_recipe', function(req, res){
  console.log("g");
  Cookbooks.findOne({_id: req.params.id}).then(function (cookbooks){
    cookbooks.triedRecipe.push(req.body);
    cookbooks.save().then(function () {
     res.redirect('/');
   });
  });
});
app.get('/:title/edit', function(req, res){
  console.log("h");
  Cookbooks.findOne({title: req.params.title}).then(function (cookbooks){
  res.render('edit', {cookbooks: cookbooks});
 });
});
app.post('/:id/edit', getCookBook, function(req, res){
  console.log("i");
  // Need to make the changes occur.
     console.log(req.cookbooks);
     const cookbook = req.cookbooks;
     cookbook.title = req.body.title;
     cookbook.author = req.body.author;
     cookbook.price = req.body.price;
    //  cookbook.pageNumber = req.body.pageNumber;
    //  cookbook.triedRecipe.recipeTitle = req.body.triedRecipe.recipeTitle;
     const error = cookbook.validateSync();
     if (!error) {
       cookbook.save();
       res.redirect('/');
     } else {
       console.log(error);
       res.render('edit', {cookbooks, errors: error.errors})
     }
// This code is another way to accomplish the above method.
//   Cookbooks.findOneAndUpdate({_id: req.params.id}, req.body).then(function (cookbooks) {
//     console.log(req.body);
//       res.redirect('/');
// });
});





app.get('/:id/edit_recipe', function(req, res){
  console.log("j");
  Cookbooks.findOne({_id: req.params.id}).then(function (cookbooks){
  res.render('edit_recipe', {cookbooks: cookbooks});
 });
});
app.post('/:id/edit_recipe', function(req, res){
  console.log("k");
  // Need to make the changes occur.
  Cookbooks.findOneAndUpdate({_id: req.params.id}, req.body).then(function (cookbooks) {
    console.log(req.body);
      res.redirect('/');
});
});
app.listen(port, function(){
 console.log("The server is running on port: " + port);
});
