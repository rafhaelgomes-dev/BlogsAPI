const express = require('express');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

const { createUser, getAllUser, getById } = require('../controllers/user.controller');

router.post('/', createUser);

router.get('/', validateToken, getAllUser);

router.get('/:id', validateToken, getById);

module.exports = router;