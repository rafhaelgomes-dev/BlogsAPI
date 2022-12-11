const { Category } = require('../models/index');

const createCategory = async (data) => {
  const { name } = data;

  if (!name) {
    return { type: 'name_is_required', statusCode: 400, message: '"name" is required' };
  }

  const create = await Category.create(data);

  return { type: null, statusCode: 201, message: create };
};

module.exports = {
  createCategory,
};