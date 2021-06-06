var express = require('express');
var router = express.Router();

const tagsRepo = require('../repositories/tags');
const auth = require('../repositories/auth');

// GET methods

router.get('/', async function(req, res, next) {
    const offset = Number(req.query.offset);
    const limit = Number(req.query.limit);
    if(offset && limit)
      res.send(await tagsRepo.getTags(offset,limit));
    else
    res.send(await tagsRepo.getAllTags());
});

router.get('/:id', async function(req, res, next) {
    const id = req.params.id;
    res.send(await tagsRepo.getTag(id));
});

router.get('/:id/articles', async function(req, res, next) {
    const id = req.params.id;
    res.send(await tagsRepo.getTagArticles(id));
});

//PUT methods

router.put('/',auth.verifyToken, async function(req, res, next) {
    const id = req.body.id;
    const name = req.body.name;
    if(name)
      res.send(await tagsRepo.updateTagName(id,name));
});

//POST methods

router.post('/',auth.verifyToken, async function(req, res, next) {
    const tag = {
      name: req.body.name,
    };
    res.send(await tagsRepo.addTag(tag));
});

//DELETE methods

router.delete('/:id',auth.verifyToken, async function(req, res, next) {
    const id = req.params.id;
    res.send(await tagsRepo.deleteTag(id).then(message =>{
      console.log(message)
    }));
});

module.exports = router;