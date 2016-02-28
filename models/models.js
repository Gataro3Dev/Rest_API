var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
  username: String,
  password: String, //creado apartir de la contraseña
  created_at: {type: Date, default: Date.now}
});

var postSchema = new mongoose.Schema({
  created_by: String,      //cambia en referencia al usuario
  created_at: {type: Date, default: Date.now},
  text: String
});

//declarar el modelo llamado usuario que tiene un esquema userSchema

mongoose.model('User', userSchema);
mongoose.model('Post', postSchema);
