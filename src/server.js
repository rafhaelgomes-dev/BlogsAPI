require('dotenv').config();
const app = require('./app');

const loginRouter = require('./routes/login.routes');
const userRouter = require('./routes/user.routes');
const categoriesRouter = require('./routes/categories.routes');
const blogPostRouter = require('./routes/blogPost.routes');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categoriesRouter);
app.use('/post', blogPostRouter);

app.listen(port, () => console.log('ouvindo porta', port));
