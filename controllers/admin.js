var Category = require("../models/Category");
var Quote = require("../models/Quote");
module.exports = {
	index: function(req, res){
		if(req.user && req.user.role == "admin"){
			res.send("wellcome to admin page");
		}else{
			res.send("You don't have permission to this page");
		}
	},
	user: function(req, res){
		//select default 20 user from db
		//display info of them
		//.
		res.render("../views/admin/user",{user: req.user});
	},
	category: function(req, res){
		//select all category
		//
		Category.find({}).sort({created_on: -1})
			.exec(function(err, categories){
				if(err){
					//loi truy van co so du lieu
				}else{	
					res.render("../views/admin/category",{user: req.user, categories:categories});
				}
			});

	},
	apiCategory: function(req, res){
		Category.find({}).sort({created_on: -1})
			.exec(function(err, categories){
				if(err){
					//console.log(category);
					res.status(500);
					res.json({status: "err"});
				}else{	
					res.json({status: "ok", data:categories});
				}
			});

	},
	createOrUpdateCategory: function(req, res){
		let id = req.body.id;
		let name = req.body.name;
		let tag = req.body.tag;
		console.log("id: "+id+", name:"+name+", tag:"+tag);
		if(!id){
		let category = new Category({
			name:name,
			tag:tag
		});
		category.save(function(err, resultcategory){
			if(err) {
				console.log(err);
				res.send("err");
			}else{
				res.end(JSON.stringify(resultcategory));
			}
		});
		}else{
			Category.findOneAndUpdate({_id: id},{$set: {name: name, tag: tag}},{new: true},function(err, category){
				if(err) {
					console.log(err);
					res.send("err");
				}else{
					console.log(category);
					res.end(JSON.stringify(category));
				}	
			});
		}
	},
	apiCreateOrUpdateCategory: function(req, res){
		let id = req.body.id;
		let name = req.body.name;
		let tag = req.body.tag;
		console.log("id: "+id+", name:"+name+", tag:"+tag);
		if(!id){
		let category = new Category({
			name:name,
			tag:tag
		});
		category.save(function(err, resultcategory){
			if(err) {
				res.json({status: "error"});
				//console.log(err);
			}else{
				res.json({status: "ok", data: resultcategory});
			}
		});
		}else{
			Category.findOneAndUpdate({_id: id},{$set: {name: name, tag: tag}},{new: true},function(err, category){
				if(err) {
					res.json({status: "error"});
					//console.log(err);
				}else{
					//console.log(category);
					res.json({status: "ok",data: category});
				}	
			});
		}
	},
	apiCreateOrUpdateQuote: function(req, res){
		let id = req.body.id;
		let content = req.body.content;
		let author = req.body.author;
		let categories = req.body.categories;
		let created_by = req.user._id;
		console.log("id: "+id+", content:"+content+", author:"+author+", categories:"+categories);
		if(!id){
		let quote= new Quote({
			content:content,
			author:author,
			categories: categories,
			created_by: created_by
		});
		quote.save(function(err, resultQuote){
			if(err) {
				res.json({status: "error"});
				//console.log(err);
			}else{
				res.json({status: "ok", data: resultQuote});
			}
		});
		}else{
			Quote.findOneAndUpdate({_id: id},{$set: {content: content, author: author,categories: categories}},{new: true},function(err, quote){
				if(err) {
					res.json({status: "error"});
					//console.log(err);
				}else{
					//console.log(category);
					res.json({status: "ok",data:quote});
				}	
			});
		}
	},

	deleteCategory: function(req, res){
		let id = req.body.id;
		console.log("id:"+id);
		Category.remove({_id: id}, function(err){
			if(err){
				console.log(err);
				res.send("err");
			}else{
				res.send("ok");
			}
		});	
	},
	apiDeleteCategory: function(req, res){
		let id = req.body.id;
		console.log("id:"+id);
		Category.remove({_id: id}, function(err){
			if(err){
				res.status(500);
				console.log(err);
				res.json({status: "error"});
			}else{
				res.json({status:"ok"});
			}
		});	
	},
	checkCategory: function(req, res){
		let category = req.params.category;
		console.log("check category:"+category);
		Category.find({name: category})
			.exec(function(err, resultCategory){
				if(err) {
					res.send("err");
				}else{
					if(Object.keys(resultCategory).length > 0){
						res.send("exist");
					}else{
						res.send("ok");
					}
				}
			});			
	},
	apiCheckCategory: function(req, res){
		let category = req.params.category;
		//console.log("check category:"+category);
		Category.find({name: category})
			.exec(function(err, resultCategory){
				//console.log(typeof resultCategory);
				if(err) {
					res.status(500);
					res.json({status: "error"});
				}else{
					//op this category exist
					if(resultCategory.length > 0){
						res.json({status: "exist"});
					}else{
						res.json({status: "ok"});
					}
				}
			});			
	},
	//all admin quote here
	quote: function(req, res){
		//skip n
		//limit 20
		Quote.find({}).sort({created_on: -1}).limit(20)
			.exec(function(err, resultQuotes){
				if(err){
					res.status(500);
					res.end("Lỗi hệ thống");
				}else{
					res.render("../views/admin/quote",{user: req.user,quotes:resultQuotes});
				}				
			});		
	},
	apiTotalQuotes: function(req, res){
		let recordPerPage = 20;
		Quote.count({}, function(err, numDocs){
			if(err){
				res.status(500);
				res.json({status: "error"});
			}else{
				if(numDocs <= recordPerPage){
					res.json({status: "ok", data:{total: 1}});
				}else{
					let totalPage;
					if((numDocs%recordPerPage)!==0){
						totalPage = Math.round(numDocs/recordPerPage)+1;
					}else{
						totalPage = Math.round(numDocs/recordPerPage);
					}
					res.json({status: "ok", data:{total: totalPage}});
				}
			}
		});
	},
	apiQuoteByPage: function(req, res){
		let recordPerPage = 20;
		let page = req.params.page;
		let skip = recordPerPage*(page-1);
		console.log("page:"+page+", skip:"+skip);
		Quote.find({}).sort({created_on: -1}).skip(skip).limit(recordPerPage)
			.populate('categories', '_id name')
			.exec(function(err, resultQuotes){
				if(err){
					res.status(500);
					res.json({status: "error"});
				}else{
					res.json({status: "ok", data:resultQuotes});	
				}	
			});
	}

}	
