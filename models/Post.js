var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var postSchema = new Schema({
	title: String,
	author: String,
	body: String,
	hidden: { type:Boolean, default: false},
	created_on: { type: Date, default: Date.now },
	modified_on: { type: Date, default: Date.now },
});
//in production
postSchema.set({'autoIndex': false});
postSchema.index({title:1, body:1});
module.exports = mongoose.model("Post", postSchema);
