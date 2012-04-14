/*
  User model
  */


var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
  login: {type: String, unique: true},
  password: {type: String, index:true}
})

UserSchema.statics.create = function(data,cb){
  if(data.login && data.password) {
    var user = new User(data,{strict:true})
    user.save(cb)
  } else {
    cb( new Error('Illegal arguments'))
  }
}

UserSchema.statics.authenticate = function(data,cb){
  User.findOne({login:data.login},function(err,user){
    if(err){cb(err)}
    else if(user){
      if( user.password == data.password) {
        cb(null,'ok')
      } else {
        cb(null,'wrong_password')
      }
    } else {
      cb(null,'unknown_login')
    }
  })
}

module.exports = User = mongoose.model('User', UserSchema)