var express = require('express');
var router = express.Router();

router.route('/post')

  .post(function(req, res){
    req.send({message:"Gataro3Dev creado un new post en la BD"});
  })

  .get(function(req, res){
    req.send({message:"Gataro3Dev carga todos los post de la BD"});
  })

router.route('/postd/:id')

  .put(function(req, res){
    return res.send({message: 'Gataro3Dev modificar post usando parametros' + req.param.id});
  })

  .get(function(req, res){
    return res.send({message: 'Gataro3Dev carga post usando parametros' + req.param.id});
  })

  .delete(function(req, res){
    return res.send({message: 'Gataro3Dev elimina post usando parametros' + req.param.id});
  })

module.exports = router;
