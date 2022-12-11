const { User } = require('../models/index');
const { createToken } = require('../auth/jwt.auth');

const login = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    return { type: 'empty_fields', statusCode: 400, message: 'Some required fields are missing' };
  }

  const getByEmailAndPassword = await User.findOne({ where: { email, password } });

  if (!getByEmailAndPassword) {
    return { type: 'invalid_fields', statusCode: 400, message: 'Invalid fields' };
  }

  const token = createToken(email);
  
  return { type: null, statusCode: 200, message: { token } };
};

module.exports = {
  login,
};