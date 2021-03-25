const express = require('express');
const morgan = require('morgan');
const postRouter = require('./routes/postRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/posts', postRouter);

module.exports = app;
