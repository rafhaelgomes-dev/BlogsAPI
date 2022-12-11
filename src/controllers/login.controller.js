const loginServices = require('../services/login.services');

const login = async (req, res) => {
  try {
    const result = await loginServices.login(req.body);
    if (result.type) {
      return res.status(result.statusCode).send({ message: result.message });
    }

    res.status(result.statusCode).send(result.message);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  login,
};