const { validateToken } = require('../auth/jwt.auth');
const { User, BlogPost, PostCategory, Category } = require('../models');

const returnValidatefields = { 
  type: 'invalid', 
  statusCode: 400, 
  message: 'Some required fields are missing' };

const returnValidateCategories = { 
  type: 'invalid', 
  statusCode: 400, 
  message: 'one or more "categoryIds" not found' }; 

const createPost = async (data) => {
  const { title, content, categoryIds } = data.post;

  if (!title || !content || !categoryIds) { return returnValidatefields; }

  let categoriasId = [];
  
  const category = await Category.findAll();
  category.forEach((e) => { categoriasId = [...categoriasId, e.dataValues.id]; });

  if (!categoryIds.every((e) => categoriasId.includes(e))) {
    return returnValidateCategories; 
  }

  const email = validateToken(data.token);

  const getUserByEmail = await User.findOne({ where: { email },  
    attributes: { exclude: ['password'] } });

  const post = { title, content, userId: getUserByEmail.toJSON().id };
  const createPostBlog = await BlogPost.create(post);

  await Promise.all(categoryIds.map(async (e) => PostCategory.create({
    postId: createPostBlog.id,
    categoryId: e,
  })));

 return { type: null, statusCode: 201, message: createPostBlog };
};

const getAllPost = async () => {
  const getAll = await BlogPost.findAll({
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
    { model: Category, as: 'categories', through: { attributes: [] } }],
    order: [['id', 'ASC']],
  });
  return { type: null, statusCode: 200, message: getAll };
};

const getById = async (id) => {
  const getPostId = await BlogPost.findOne({
    where: { id },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
    { model: Category, as: 'categories', through: { attributes: [] } }],
    order: [['id', 'ASC']],
  });
  
  if (getPostId === null) {
   return { type: 'POST_NOT_EXIST', statusCode: 404, message: 'Post does not exist' };
  }

  return { type: null, statusCode: 200, message: getPostId };
};

  const editPostUser = async (id, token, data) => {
  const { title, content } = data;

  if (!title || !content) { return returnValidatefields; }

  const getPostId = await BlogPost.findOne({
    where: { id },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
  });
  
  const email = validateToken(token);

  if (getPostId.user.email === email) {
    await BlogPost.update({ title, content }, { where: { id } });

    const findPostUpdate = await BlogPost.findOne({ 
      where: { id }, 
      include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
      { model: Category, as: 'categories', through: { attributes: [] } }] });

    return { type: null, statusCode: 200, message: findPostUpdate };
  }

  return { type: 'Unauthorized', statusCode: 401, message: 'Unauthorized user' };
};

module.exports = {
  createPost,
  getAllPost,
  getById,
  editPostUser,
};