
var
  should     = require('should'),
  mongoose   = require('mongoose'),
  User       = require('../models/user')


var removeUserIfExist = function(userId){
  return function(done){
    User.remove({login:userId},done)
  }
}

describe('DB models tests:',function(){
  before(function(done){
    mongoose.connection.on('open',function(){
      done()
    })
    mongoose.connection.on('error',function(err){
      done(err)
    })
    mongoose.connect('mongodb://localhost/test')
  })
  before(removeUserIfExist('stefan'))

  describe('Create user stefan should be successful',function(){
    it('done',function(done){
      var userData = { login: 'stefan' , password : '123456'}
      User.create(userData,done)
    })
  })

  describe('Authenticate user stefan should be successful',function(){
    it('done',function(done){
      var userData = { login: 'stefan' , password : '123456'}
      User.authenticate(userData,function(err,status){
        if(err){done(err)}
        else {
          should.exist(status)
          status.should.be.a('string')
          status.should.be.eql('ok')
          done()
        }
      })
    })
  })

  describe('Authenticate user stefan should fail for wrong password',function(){
    it('done',function(done){
      var userData = { login: 'stefan' , password : 'aaaaaaa'}
      User.authenticate(userData,function(err,status){
        if(err){done(err)}
        else {
          should.exist(status)
          status.should.be.a('string')
          status.should.be.eql('wrong_password')
          done()
        }
      })
    })
  })

  describe('Authenticate should return unknown_user for user bolek',function(){
    it('done',function(done){
      var userData = { login: 'bolek' , password : 'aaaaaaa'}
      User.authenticate(userData,function(err,status){
        if(err){done(err)}
        else {
          should.exist(status)
          status.should.be.a('string')
          status.should.be.eql('unknown_login')
          done()
        }
      })
    })
  })

})
