const jwt = require('jsonwebtoken');

require('dotenv/config');

const JWT_SECRET = process.env.JWT_SECRET || 123456789;

const header = { expiresIn: '15m', algorithm: 'HS256' };

const createToken = (user) => {
    const token = jwt.sign({ data: user }, JWT_SECRET, header);

    return token;
};

module.exports = { createToken };