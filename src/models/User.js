const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email:String,
    password:String
});


newUser.save()
  .then(savedUser => {
    console.log('Usuario guardado:', savedUser);
})
  .catch(error => {
    console.error('Error al guardar el usuario:', error);
});

module.exports = model('User', userSchema)