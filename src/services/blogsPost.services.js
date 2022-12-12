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

module.exports = {
  createPost,
};