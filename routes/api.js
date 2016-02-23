var express = require('express');
var router = express.Router();

router.route('/post')

  .post(function(req, res){
    req.send({message:"Gataro3Dev creado un new post en la BD"});
  })

  .get(function(req, res){
    req.send({message:"Gataro3Dev carga todos los post de la BD"});
  })

module.exports = router;
