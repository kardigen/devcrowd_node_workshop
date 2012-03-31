
var
 http       = require('request'),
 should     = require('should'),
 $          = require('jquery')

var url = 'http://localhost:3000'

describe('API tests:',function(){
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

  describe('Server should response *welcome message* for / request',function(){
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
})