// app/models.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
	item_name: String
});

module.exports = mongoose.model('Item', ItemSchema);