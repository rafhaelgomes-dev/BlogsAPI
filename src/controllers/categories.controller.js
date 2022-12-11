const { createCategory, getAllCategories } = require('../services/categories.services');

const create = async (req, res) => {
  try {
    const result = await createCategory(req.body);
    if (result.type) {
      return res.status(result.statusCode).send({ message: result.message });
    }

    res.status(result.statusCode).json(result.message);
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

const getAll = async (_req, res) => {
  try {
    const result = await getAllCategories();
    res.status(result.statusCode).json(result.message);
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

module.exports = {
  create,
  getAll,
};