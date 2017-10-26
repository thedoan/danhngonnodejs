var express = require('express');
var router = express.Router();
var adminController = require("../controllers/admin");
router.get("/", adminController.index);
router.get("/user", adminController.user);
router.get("/category", adminController.category);
router.get("/checkcategory/:category", adminController.checkCategory);
router.post("/category", adminController.createOrUpdateCategory);
router.delete("/category", adminController.deleteCategory);
module.exports = router;

