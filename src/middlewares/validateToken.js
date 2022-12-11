const { validateToken } = require('../auth/jwt.auth');

const validateUserToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send({ message: 'Token not found' });
  }

  const validateTokenDecoded = validateToken(token);

  if (!validateTokenDecoded) {
    return res.status(401).send({ message: 'Expired or invalid token' });   
  }

  next();
};

module.exports = validateUserToken;