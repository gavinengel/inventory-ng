// app/models.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
	name: String,
  description: String,
  quantity: String,
  price: String
});

module.exports = mongoose.model('Item', ItemSchema);
