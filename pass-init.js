var mongoose = require('mongoose');
var User = mongoose.model('User');
var localStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){
//Passport tiene que ser capaz de serializar y deserializar los usuarios para soportar sesiones de inicio de sesión permanente
  passport.serializeUser(function (user, done) {
    console.log('serializando usuario: ', user.username);
    //Retorna un unico id por usuario
    return done(null, user._id);
  });
//deserializar usuario llamará con el identificador único facilitado por serializar
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
     // console.log('deserializar usuario: ', user.username);
      return done(err, user);
    });
  });

  passport.use('login', new localStrategy({
      passReqCallback : true
    },
    function (username, password, done) {
      //comprobar en mongo si el nombre de usuario existe o no
      User.findOne({'username': username}, function (err, user) {
        //en caso de cualquier error, retornar usando el metodo de nuevo
        if(err){
          return done(err);
        }
        //el usuario no existe, llevar al registro de error y redirigir atras
        if(!user){
          console.log('usuario ' + username + ' no se encontro');
          return done(null, false);
        }
        //Existe usuario, pero una contraseña incorrecta
        if(!isValidPassword(user, password)){
          //password incorrecto
          console.log('Password incorrecto');
          return done(null, false);// redirecciona al login
        }
        //usuario y contraseña coinciden, regresa al metodo con exito
        return  done(null, user);
      });
    })
  );

  passport.use('signup', new localStrategy({
      passReqCallback : true //permite pasar de nuevo la solicitud para su devolucion
    },
    function (req, username, password, done) {
      //encontrar un usuario en mongo, con el nombre proporcionado
      User.findOne({'username': username}, function (err, user) {
        //en caso de cualquier error, devolver al metodo
        if(err){
          console.log('Error en el registro: ' + err);
          return done(err);
        }
        //ya existe
        if(user) {
          console.log(username + ' ya existe');
          return done(null, false);
        }
        else {
          //si no hay ningun usuario, crear usuario
          var newUser = new User();
          //establecer credenciales de usuario
          newUser.username = username;
          newUser.password = createHash(password);
          //guardar el usuario
          newUser.save(function (err) {
            if(err){
              console.log('Error al guardar usuario: ' + err);
              throw err;
            }
            console.log(newUser.username + ' Registro de usuario exitoso');
            return done(null, newUser);
          });
        }
      });
    })
  );

  var isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.password);
  };

  var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  };

};
