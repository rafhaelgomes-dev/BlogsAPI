const express = require('express');

const router = express.Router();

const { create, getPost, getPostById } = require('../controllers/blogPost.controller');

const validateToken = require('../middlewares/validateToken');

router.post('/', validateToken, create);
router.get('/', validateToken, getPost);
router.get('/:id', validateToken, getPostById);

module.exports = router;