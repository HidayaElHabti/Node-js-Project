var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');
var commentsRouter = require('./routes/comments');
var tagsRouter = require('./routes/tags');

var app = express();

const PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', authRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);
app.use('/comments', commentsRouter);
app.use('/tags', tagsRouter);

module.exports = app;

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
