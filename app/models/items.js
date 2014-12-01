// app/models.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
	name: String,
  description: String,
  quantity: String,
  price: String,
  ts: Date
});

module.exports = mongoose.model('Item', ItemSchema);
