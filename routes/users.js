var express = require('express');
var router = express.Router();

const usersRepo = require('../repositories/users');
const articlesRepo = require('../repositories/articles');
const auth = require('../repositories/auth');

// GET methods

router.get('/',auth.verifyToken, async function(req, res, next) {
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

router.get('/admins',auth.verifyToken, async function(req, res, next) {
  res.send(await usersRepo.getAdmins());
});

router.get('/authors',auth.verifyToken, async function(req, res, next) {
  res.send(await usersRepo.getAuthors());
});

router.get('/guests',auth.verifyToken, async function(req, res, next) {
  res.send(await usersRepo.getGuests());
});

router.get('/:id',auth.verifyToken,async function(req, res, next) {
  const id = req.params.id;
  res.send(await usersRepo.getUser(id));
});

router.get('/:id/articles', async function(req, res, next) {
  const id = req.params.id;
  res.send(await articlesRepo.getAllUserArticles(id));
});

// POST methods
router.post('/',auth.verifyToken, async function(req, res, next) {
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  };
  res.send(await usersRepo.addUser(user));
});

router.post('/:id/articles',auth.verifyToken, async function(req, res, next) {
  const article = {
    title: req.body.title,
    content: req.body.content,
    published: req.body.published,
    UserId: req.params.id
  };
  res.send(await articlesRepo.addArticle(article));
});

// PUT methods

router.put('/',auth.verifyToken, async function(req, res, next) {
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

router.delete('/:id',auth.verifyToken, async function(req, res, next) {
  const id = req.params.id;
  res.send(await usersRepo.deleteUser(id).then(message =>{
    console.log(message)
  }));
});

module.exports = router;
