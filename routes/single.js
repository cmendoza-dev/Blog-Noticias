var express = require('express');
var router = express.Router();
const controller = require('../controllers/postController');


/* Inicio */
router.get('/', function(req, res, next) {
res.render('single');
});

router.get('/:id', async (req, res) => {
    const post = await controller.detail(req, res);
    res.render('single', { post });
});

module.exports = router;
