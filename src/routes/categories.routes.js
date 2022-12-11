const express = require('express');

const router = express.Router();
const { create, getAll } = require('../controllers/categories.controller');

const validateToken = require('../middlewares/validateToken');

router.post('/', validateToken, create);

router.get('/', validateToken, getAll);

module.exports = router;