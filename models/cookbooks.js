let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let cookBookSchema = new Schema({
 title:  {type: String, required: true, unique: true},
 author: String,
 price: Number,
 triedRecipe: [{
   recipeTitle: String,
   tasty: {type: Boolean, default: true},
   pageNumber: Number
 }],
});

const CookBook = mongoose.model('CookBook', cookBookSchema);

module.exports = CookBook;
