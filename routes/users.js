var express = require('express');
var router = express.Router();

const usersRepo = require('../repositories/users');
const articlesRepo = require('../repositories/articles');

// GET methods

router.get('/', async function(req, res, next) {
  const offset = Number(req.query.offset);
  const limit = Number(req.query.limit);
  const email = req.query.email;
  if(offset && limit)
    res.send(await usersRepo.getUsers(offset,limit));
  else if(email)
    res.send(await usersRepo.getUserByEmail(email))
  else
  res.send(await usersRepo.getAllUsers());
});

router.get('/admins', async function(req, res, next) {
  res.send(await usersRepo.getAdmins());
});

router.get('/authors', async function(req, res, next) {
  res.send(await usersRepo.getAuthors());
});

router.get('/guests', async function(req, res, next) {
  res.send(await usersRepo.getGuests());
});

router.get('/:id', async function(req, res, next) {
  const id = req.params.id;
  res.send(await usersRepo.getUser(id));
});

router.get('/:id/articles', async function(req, res, next) {
  const id = req.params.id;
  res.send(await articlesRepo.getAllUserArticles(id));
});

// POST methods
router.post('/', async function(req, res, next) {
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  };
  res.send(await usersRepo.addUser(user));
});

router.post('/:id/articles', async function(req, res, next) {
  const article = {
    title: req.body.title,
    content: req.body.content,
    published: req.body.published,
    UserId: req.params.id
  };
  res.send(await articlesRepo.addArticle(article));
});

// PUT methods

router.put('/', async function(req, res, next) {
  const id = req.body.id;
  const username = req.body.username;
  if(username)
    res.send(await usersRepo.updateUserUsername(id,username));
  const email = req.body.email;
  if(email)
    res.send(await usersRepo.updateUserEmail(id,email));
  const password = req.body.password;
  if(password)
    res.send(await usersRepo.updateUserPassword(id,password));
  const role = req.body.role;
  if(role)
    res.send(await usersRepo.updateUserRole(id,role));
});

//DELETE methods

router.delete('/:id', async function(req, res, next) {
  const id = req.params.id;
  res.send(await usersRepo.deleteUser(id).then(message =>{
    console.log(message)
  }));
});

module.exports = router;
