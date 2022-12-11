const express = require('express');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

const { createUser, getAllUser } = require('../controllers/user.controller');

router.post('/', createUser);

router.get('/', validateToken, getAllUser);

module.exports = router;