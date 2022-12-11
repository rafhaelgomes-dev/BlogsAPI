const express = require('express');

const router = express.Router();
const { create } = require('../controllers/categories.controller');

const validateToken = require('../middlewares/validateToken');

router.post('/', validateToken, create);

module.exports = router;