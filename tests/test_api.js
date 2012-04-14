
var
 http       = require('request'),
 should     = require('should'),
 $          = require('jquery'),
 mongoose   = require('mongoose')


mongoose.connect('mongodb://localhost/test')
var User       = require('../models/user')


var url = 'http://localhost:3000'

var removeUserIfExist = function(userId){
  return function(done){
    User.remove({login:userId},done)
  }
}


describe('API tests:',function(){
  before(removeUserIfExist('stefan'))
  before(removeUserIfExist('bolek'))

  describe('Server should response 200 for / request',function(){
    it('done',function(done){
      http.get(url + '/',function(err,res,body){
        if(err){done(err)}
        else{
          res.statusCode.should.be.equal(200)
          done()
        }
      })
    })
  })

  describe('Server should response home page for / request',function(){
    it('done',function(done){
      http.get(url + '/',function(err,res,body){
        if(err){done(err)}
        else{
          res.statusCode.should.be.equal(200)
          var parsedBody =$(body)
          should.exist(parsedBody)

          var loginPanel = $('#loginPanel',parsedBody)
          should.exist(loginPanel)
          loginPanel.should.have.length(1)

          done()
        }
      })
    })
  })

  describe('Server should return 201 on user successful creation',function(){
    it('done',function(done){
      http({
          method:'POST',
          url:url + '/users',
          json:true,
          body: JSON.stringify({login:'stefan',password:'123456'})},
        function(err,res,body){
          if(err){done(err)}
          else{
            res.statusCode.should.be.equal(201)
            done()
          }
        })
    })
  })

  describe('Server should return 400 on user empty data',function(){
    it('done',function(done){
      http({
          method:'POST',
          url:url + '/users',
          json:true},
        function(err,res,body){
          if(err){done(err)}
          else{
            res.statusCode.should.be.equal(400)
            done()
          }
        })
    })
  })

  describe('Server should return 400 on user login duplicate',function(){
    it('done',function(done){
      http({
          method:'POST',
          url:url + '/users',
          json:true,
          body: JSON.stringify({login:'stefan',password:'123456'})},
        function(err,res,body){
          if(err){done(err)}
          else{
            res.statusCode.should.be.equal(400)
            done()
          }
        })
    })
  })

  describe('Server should return \'unknown_user\' when no such user in db',function(){
    it('done',function(done){
      http({
          method:'POST',
          url:url + '/authentication',
          json:true,
          body: JSON.stringify({login:'bolek',password:'123456'})},
        function(err,res,body){
        if(err){done(err)}
        else{
          res.statusCode.should.be.equal(200)
          should.exist(body)
          body.should.be.a('object')
          body.should.have.property('status','unknown_login')
          done()
        }
      })
    })
  })
})