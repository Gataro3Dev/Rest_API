var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

//se utiliza para las rutas que deben ser autenticadas
function isAuthenticated(req, res, next) {
  /*si el usuario se autentica en la sesion, llama al siguiente controlador de solicitud
  passport agrega este metodo como objeto de la solicitud, se permite unmiddleware para añadir propiedades a:
  objetos de peticion y solicitud.*/

  //permite a todos conseguir metodos de peticion
  if(req.method === 'GET'){
    return next();
  }
  if(req.isAuthenticated()){
    return next();
  }
  //si el usuario no esta autenticado lo redirecciona al login
  return res.redirect('$/login');
};
//registro del middleware de autenticacion
router.use('/posts', isAuthenticated)

router.route('/posts')
  //crear un nuevo mensaje
  .post(function(req, res){

    var post = new Post();
    post.text = req.body.text;
    post.created_by = req.body.created_by;

    post.save(function (err, post) {

      if(err){
        return res.send(500, err);
      }

      return res.json(post);
    });
  })
  //recive todos los mensajes
  .get(function(req, res){
      console.log('debug1');
      Post.find(function (err, posts) {
        console.log('debug2');
        if(err){
          return res.send(500, err);
        }
        return res.send(200, posts);
      });
  });
//comandos mensajes especificos; no sera utilizado
router.route('/posts/:id')
  //recive mensaje especifico
  .get(function(req, res){

    Post.findById(req.params.id, function (err, post) {
      if(err){
        res.send(err);
      }
      res.json(post);
    })

  })
  //actualiza mensaje especifico
  .put(function(req, res){

    Post.findById(req.params.id, function (err, post) {
      if(err){
        res.send(err);
      }
      post.created_by = req.body.created_by;
      post.text = req.body.text;

      post.save(function (err, post) {
        if(err){
          res.send(err);
        }
        res.json(post);
      });

    });

  })

  //borrando mensaje
  .delete(function(req, res){
    Post.remove({
      _id: req.params.id
    }, function (err) {
      if(err){
        res.send(err);
      }
      res.json('deleted :(')
    });
  });

module.exports = router;
