const { createPost, getAllPost } = require('../services/blogsPost.services');

const create = async (req, res) => {
  try {
    const token = req.header('Authorization');
    const data = {
      token,
      post: req.body,
    };
    const result = await createPost(data);

    if (result.type) {
      return res.status(result.statusCode).send({ message: result.message });
    }
    
    return res.status(result.statusCode).send(result.message);
  } catch (error) {
    res.status(400).send({ message: 'error' });
  }
};

const getPost = async (_req, res) => {
  try {
    const result = await getAllPost();

    if (result.type) {
      return res.status(result.statusCode).send({ message: result.message });
    }
    
    return res.status(result.statusCode).send(result.message);
  } catch (error) {
    res.status(400).send({ message: 'error' });
  }
};

module.exports = {
  create,
  getPost,
};