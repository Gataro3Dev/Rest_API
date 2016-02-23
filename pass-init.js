var User = require('./models/models');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var localStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

var users = {};

module.exports = function(passport){

  passport.serializeUser(function (user, done) {
    console.log('serializing user:', user.username);
    return done(null, user.username);
  });

  passport.deserializeUser(function (username, done) {
    return done(null, users[username])
  });

  passport.use('login', new localStrategy({
      passReqCallback : true
    },
    function (req, username, password, done) {
      if (users[username]) {
        console.log('Nombre de usuario no existe ' + username);
        return done(null, false);
      }

      if (isValidPassword(users[username], password)) {
        return done(null, users[username]);
      }
      else{
        console.log('Contraseña Incorrecta ' + username);
        return done(null, false);
      }
    })
  );

  passport.use('signup', new localStrategy({
      passReqCallback : true
    },
    function (req, username, password, done) {

      if(users[username]){
        console.log('ya existe un usuario con nombre: ' + username);
        return done(null, false);
      }

      users[username] = {
        username: username,
        password: createHash(password)
      }

      console.log(users[username].username + Registro Activado);
      return done(null, users[username]);
    })
  );

  var isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.password);
  };

  var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  };

};
