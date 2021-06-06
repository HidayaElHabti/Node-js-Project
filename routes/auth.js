var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();

const usersRepo = require('../repositories/users');

//Post method

router.post('/', async function(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const userReturned = await usersRepo.getUserByEmail(email);
    const user = (JSON.parse(JSON.stringify(userReturned)))[0];
    if(user.password != password && user.role=='guest')
        res.sendStatus(403);
    else
    {
        jwt.sign(JSON.stringify(user),'secretKey',(err, token)=>{
            res.json({token});
        })
    }
});

module.exports = router;