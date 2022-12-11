const userServices = require('../services/user.service');

const createUser = async (req, res) => {
  try {
    const result = await userServices.createUser(req.body);
    if (result.type) {
      return res.status(result.statusCode).send({ message: result.message });
    }
    res.status(result.statusCode).send(result.message);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllUser = async (_req, res) => {
  try {
    const result = await userServices.getAllUser();
    if (result.type) {
      return res.status(result.statusCode).send({ message: result.message });
    }
    res.status(result.statusCode).send(result.message);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createUser,
  getAllUser,
};