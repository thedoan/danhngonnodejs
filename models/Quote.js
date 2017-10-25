var mongoose = require("mongoose"),
	Schema = mongoose.Schema;
var creationInfo = require("./plugin/creationinfo");
var quoteSchema = Schema({
	content: String,
	author: String,
	created_by:{ type: Schema.Types.ObjectId, ref: 'User' },
	categories:[String],
	tags: [String],
	liked_user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	saved_user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	/*
	created_on: { type: Date, default: Date.now },
	modified_on: { type: Date, default: Date.now },
	*/
});
quoteSchema.plugin(creationInfo);
module.exports = mongoose.model("Quote", quoteSchema);
