

Login = function(client){

  this.init = function(){
    $('#loginPanel').data('login',this)

    $('#loginAction').click(function(){
      var login = $.trim($('#loginBox').val())
      var password = $.trim($('#passwordBox').val())

      if(login && login.length && password && password.length){
        client.authenticate({login:login,password:password},function(err,res){
          if(res.status == 'wrong_login'){
            $('#loginAction').addClass('hide')
            $('#registerPanel').removeClass('hide')
          }
        })
      }
    })

    $('#backAction').click(function(){
      $('#retypedPasswordBox').val('')
      $('#loginAction').removeClass('hide')
      $('#registerPanel').addClass('hide')
    })

    $('#registerAction').click(function(){
      var login = $.trim($('#loginBox').val())
      var password = $.trim($('#passwordBox').val())
      var retypedPassword = $.trim($('#retypedPasswordBox').val())

      if(login && login.length
        && password && password.length
        && retypedPassword && retypedPassword.length
        && retypedPassword == password){
        client.createNewUser({login:login,password:password},function(err){
          if(!err){
            $('#loginPanel').addClass('hide')
            $('#welcomePanel').addClass('hide')
            $('#userPanel').removeClass('hide')
          }
        })
      }
    })

  }
}