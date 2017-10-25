var express = require('express');
var router = express.Router();
var quoteControl = require('../controllers/quote');
/* GET users listing. */
router.get('/', quoteControl.index);
//router.get('/new', quoteControl.create);
//router.post('/new', quoteControl.doCreate);
router.get('/edit', quoteControl.edit);
router.get('/delete', quoteControl.confirmDelete);
router.post('/delete', quoteControl.doDelete);
module.exports = router;
