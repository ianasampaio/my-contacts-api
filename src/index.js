const express = require('express');
const routes = require('./router');
const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/errorHandler');
require('express-async-errors');

const app = express();

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);

app.listen(3001,() => console.log('Server started at http://localhost:3001'));