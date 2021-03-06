const express = require('express');
const morgan = require('morgan');

const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');
const commentsRouter = require('./routes/commentRoutes');
const chatMessageRouter = require('./routes/chatMessageRoutes');
const conversationRouter = require('./routes/conversationRoutes');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const cors = require('cors');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/comments', commentsRouter);
app.use('/api/v1/message', chatMessageRouter);
app.use('/api/v1/conversation', conversationRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
