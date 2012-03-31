
var
  should     = require('should'),
  mongoose   = require('mongoose')

describe('DB models tests:',function(){
  describe('Connect to Mongo DB',function(){
    it('successful',function(done){
      mongoose.connection.on('open',function(){
        console.log
        done()
      })
      mongoose.connection.on('error',function(err){
        done(err)
      })
      mongoose.connect('mongodb://localhost/test')
    })
  })
})
