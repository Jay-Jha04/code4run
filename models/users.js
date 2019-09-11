const mongoose = require('mongoose');
const Joi = require('Joi');
const passportLocalMongoose=require('passport-local-mongoose');

const userSchema=new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 6
  },

  password: {
    type: String,
    minlength: 1025
  },
  isAdmin: {
    type: Boolean
  }
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User',userSchema);

function userValidation(user){
  const schema={
    name:Joi.string().required().min(2),
    username:Joi.string().required().min(6).email(),
    password:Joi.string().required().min(255)
  }

  return Joi.validate(user,schema);
}

exports.User=User;
exports.userValidation=userValidation;