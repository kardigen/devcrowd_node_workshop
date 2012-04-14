


describe('Login tests: ',function(){

  client = {
    authenticateCount: 0,
    authenticate: function(credentials,cb){
      this.authenticateCount += 1;
      cb(null,{status:'unknown_login'})
    },


    createNewUserCount: 0,
    createNewUser: function(data,cb){
      this.createNewUserCount +=1;
      cb()
    }
  }
  var testState = {}

  describe('Render index template should be successful',function(){
    it('done',function(done){
      $.ajax({
        url: 'http://' + location.host  +'/index.jade',
        error: function(err){
          done(err)
        },
        success: function(data){
          data = data.replace(/^extend.*/,'#testIndexContainer')
          data = data.replace(/block.*/g,'')
          var rendered = jade.compile(data,{compileDebug:false})()
          expect(rendered).to.be.ok()
          $('#testContainer').append(rendered)
          done()
        }
      })
    })
  })

  describe('Check loginPanel initial state',function(){
    it('done',function(done){
      expect($('#registerPanel').hasClass('hide')).to.be.ok()
      expect($('#loginAction').hasClass('hide')).to.not.be.ok()
      done()
    })
  })

  describe('Init login presenter should run successful',function(){
    it('done',function(done){
      expect($('#loginPanel').data('login')).to.be.ok()
      done()
    })
  })

  describe('Click on loginAction with empty login/pass should not run authenticate',function(){
    it('done',function(done){
      $('#loginAction').click()
      expect(client.authenticateCount).to.be.equal(0)
      done()
    })
  })

  describe('Click on loginAction with filled login/pass should run authenticate',function(){
    it('done',function(done){
      $('#loginBox').val('stefan')
      $('#passwordBox').val('123456')
      $('#loginAction').click()
      expect(client.authenticateCount).to.be.equal(1)
      done()
    })
  })

  describe('Authenticate status wrong_login should set registration form available',function(){
    it('done',function(done){
      expect($('#loginAction').hasClass('hide')).to.be.ok()
      expect($('#registerPanel').hasClass('hide')).to.not.be.ok()
      done()
    })
  })

  describe('Back button should clear re-typed password and set login form',function(){
    it('done',function(done){
      $('#retypedPasswordBox').val('123123')

      $('#backAction').click()

      expect($('#retypedPasswordBox').val()).to.be.empty()
      expect($('#loginAction').hasClass('hide')).to.not.be.ok()
      expect($('#registerPanel').hasClass('hide')).to.be.ok()
      done()
    })
  })

  describe('Click on loginAction again with filled login/pass should run authenticate and set registration form available',
    function(){
      it('done',function(done){
        client.authenticateCount = 0;

        $('#loginBox').val('stefan')
        $('#passwordBox').val('123456')
        $('#loginAction').click()
        expect(client.authenticateCount).to.be.equal(1)

        done()
      })
  })

  describe('Set re-type password and click register should invoke client.createNewUser',
    function(){
      it('done',function(done){
        $('#retypedPasswordBox').val('123456')

        $('#registerAction').click()

        expect(client.createNewUserCount).to.be.equal(1)
        done()
      })
  })

  describe('After create new user the loginPanel should be hidden and the userPanel should be shown',
    function(){
      it('done',function(done){
        expect($('#loginPanel').hasClass('hide')).to.be.ok()
        expect($('#welcomePanel').hasClass('hide')).to.be.ok()
        expect($('#userPanel').hasClass('hide')).to.not.be.ok()

        done()
      })
    })

})
