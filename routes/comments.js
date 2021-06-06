var express = require('express');
var router = express.Router();

const commentsRepo = require('../repositories/comments');

//GET methods

router.get('/', async function(req, res, next) {
  res.send(await commentsRepo.getAllComments());
});

router.get('/:id', async function(req, res, next) {
    const id = req.params.id;
    res.send(await commentsRepo.getComment(id));
});

//PUT methods

router.put('/', async function(req, res, next) {
    const id = req.body.id;
    const content = req.body.content;
    if(content)
      res.send(await commentsRepo.updateCommentContent(id,content));
});

//DELETE methods

router.delete('/:id', async function(req, res, next) {
    const id = req.params.id;
    res.send(await commentsRepo.deleteComment(id).then(message =>{
      console.log(message)
    }));
});

module.exports = router;