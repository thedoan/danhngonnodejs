var Category = require("../models/Category");
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
	}
}	
