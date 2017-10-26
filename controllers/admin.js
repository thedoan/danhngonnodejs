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

		res.render("../views/admin/category",{user: req.user});
	},
	createCategory: function(req, res){
		let name = req.body.name;
		let tag = req.body.tag;
		console.log("name:"+name+", tag:"+tag);
		let category = new Category({
			name:name,
			tag:tag
		});
		category.save(function(err, resultcategory){
			if(err) {
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
