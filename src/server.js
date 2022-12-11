require('dotenv').config();
const app = require('./app');

const loginRouter = require('./routes/login.routes');
const userRouter = require('./routes/user.routes');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use('/login', loginRouter);
app.use('/user', userRouter);

app.listen(port, () => console.log('ouvindo porta', port));
