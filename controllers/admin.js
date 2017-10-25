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
		
	},
	checkCategory: function(req, res){
		
	}
}	
