var express = require('express');
var router = express.Router();
var adminController = require("../controllers/admin");
router.get("/", adminController.index);
router.get("/admin/user", adminController.user);
router.get("/admin/category", adminController.apiCategory);
router.get("/admin/checkcategory/:category", adminController.apiCheckCategory);
router.post("/admin/category", adminController.apiCreateOrUpdateCategory);
router.delete("/admin/category", adminController.apiDeleteCategory);
router.get("/admin/quote/total", adminController.apiTotalQuotes);
router.get("/admin/quote/:page", adminController.apiQuoteByPage);
router.post("/admin/quote", adminController.apiCreateOrUpdateQuote);
module.exports = router;

