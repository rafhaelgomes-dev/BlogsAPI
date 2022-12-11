const User = require('../models/User');
const { 
  validateEmail, 
  validadePassword, 
  validadeDisplayName } = require('../utils/validations.utils');

const { createToken } = require('../auth/jwt.auth');

const messageExistingEmail = { type: 'email', statusCode: 409, message: 'User already registered' };

const messageValidateIfEmailIsAlreadyRegistered = { 
  type: 'email', 
  statusCode: 400,
  message: '"email" must be a valid email',
  };

const createUser = async (data) => {
  const validateDisplayNameLength = validadeDisplayName(data.displayName);
  if (validateDisplayNameLength) {
    return validateDisplayNameLength;
  }

  const validateIfEmailIsAlreadyRegistered = validateEmail(data.email);
  if (!validateIfEmailIsAlreadyRegistered) {
    return messageValidateIfEmailIsAlreadyRegistered;
  }

  const validatePasswordLength = validadePassword(data.password);
  if (validatePasswordLength) {
    return validatePasswordLength;
  }
  
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  const existingEmail = users.some((user) => user.email === data.email);
  if (existingEmail) { return messageExistingEmail; }

  await User.create(data);
  const token = createToken(data.email);
  return { type: null, statusCode: 201, message: { token } };
};

const getAllUser = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return { type: null, statusCode: 200, message: users };
};

const getById = async (id) => {
  const usersById = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });

  if (!usersById) {
    return { type: 'not_exist', statusCode: 404, message: 'User does not exist' };
  }

  return { type: null, statusCode: 200, message: usersById };
};

module.exports = {
  createUser,
  getAllUser,
  getById,
};