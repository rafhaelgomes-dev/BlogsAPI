const express = require('express');

const router = express.Router();

const { create, getPost } = require('../controllers/blogPost.controller');

const validateToken = require('../middlewares/validateToken');

router.post('/', validateToken, create);
router.get('/', validateToken, getPost);

module.exports = router;