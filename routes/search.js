let express = require('express');
let router = express.Router();
let ResponseUtil = require('../util/response')
const _ = require('lodash')
/* GET users listing. */
router.get('/', function(req, res, next) {
   let index = req.app.get('searchIndex')
   let term = req.query.term || null
   if(!term){
     ResponseUtil.badRequest(res, `term query param is required to search`)
   }else{
     let data = _.map(index.search(term), item=>{
       return {
         _score: item[0],
         value: item[1]
       }
     })
     ResponseUtil.ok(res, data)
   }
});

module.exports = router;
