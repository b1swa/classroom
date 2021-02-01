const express = require('express');
const router = express.Router();
const {findLog} = require('./log');

router.get('/',(req,res)=>{
    res.send('server is up and running');
})

router.get('/admin/:id',(req,res)=>{
    var result = findLog(req.params.id);
    res.send(result);
})
module.exports = router;