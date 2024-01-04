const express = require('express');
const routes = require('./router');
require('express-async-errors');

const app = express();
app.use(routes);
app.use((error, request, response, next) => {
  console.log(error);
  response.sendStatus(500);
});

app.listen(3000,() => console.log('Server started at http://localhost:3000'));