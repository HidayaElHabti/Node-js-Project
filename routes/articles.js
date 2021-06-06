var express = require('express');
var router = express.Router();

const articlesRepo = require('../repositories/articles');
const commentsRepo = require('../repositories/comments');
const auth = require('../repositories/auth');

// GET methods

router.get('/', async function(req, res, next) {
    const offset = Number(req.query.offset);
    const limit = Number(req.query.limit);
    if(offset && limit)
      res.send(await articlesRepo.getArticles(offset,limit));
    else
    res.send(await articlesRepo.getAllArticles());
});

router.get('/:id', async function(req, res, next) {
    const id = req.params.id;
    res.send(await articlesRepo.getArticle(id));
});

router.get('/:id/comments', async function(req, res, next) {
    const id = req.params.id;
    res.send(await commentsRepo.getArticleComments(id));
});

router.get('/:id/tags', async function(req, res, next) {
    const id = req.params.id;
    res.send(await articlesRepo.getArticleTags(id));
});

// PUT methods

router.put('/',auth.verifyToken, async function(req, res, next) {
    const id = req.body.id;
    const title = req.body.title;
    if(title)
      res.send(await articlesRepo.updateArticleTitle(id,title));
    const content = req.body.content;
    if(content)
      res.send(await articlesRepo.updateArticleContent(id,content));
    const published = req.body.published;
    if(published)
      res.send(await articlesRepo.updateArticlePublished(id,published));
});

router.put('/:id',auth.verifyToken, async function(req, res, next) {
  const articleid = req.params.id;
  const tagid = req.query.tag;
  if(tagid)
    res.send(await articlesRepo.addTagToArticle(articleid,tagid));
  const commentid = req.query.comment;
  if(commentid)
  {
    const content = req.body.content;
    res.send(await commentsRepo.updateCommentContent(commentid,content));
  }
});

//POST methods

router.post('/:id',auth.verifyToken, async function(req, res, next) {
  const comment = {
    content: req.body.content,
    ArticleId: req.params.id
  };
  res.send(await commentsRepo.addComment(comment));
});

//DELETE methods

router.delete('/:id',auth.verifyToken, async function(req, res, next) {
    const id = req.params.id;
    const commentid = req.query.comment;
    if(commentid)
      res.send(await commentsRepo.deleteComment(commentid)
      .then(message =>{ console.log(message) }));
    const tagid = req.query.tag;
    if(tagid)
      res.send(await articlesRepo.deleteArticleTag(id,tagid)
      .then(message =>{ console.log(message) }));
    if(!commentid && !tagid)
      res.send(await articlesRepo.deleteArticle(id)
      .then(message =>{ console.log(message) }));
});

module.exports = router;