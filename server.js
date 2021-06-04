const express = require('express');
const usersRouter = require('./routes/users');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.json());
app.use(express.urlencoded());
app.use('/users', usersRouter);
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))