/**
 * AJAX services wrapper
 */
client = {
// ----------------- UTILS ---------------
  _postObject: function(url, obj, fn){
    $.ajax({
      url:this.base+url,
      type:'POST',
      contentType:'application/json',
      dataType:'json',
      data:JSON.stringify(obj),
      success:function(data){
        fn(null, data)
      },
      error:function(jqXHR, status, errorThrown){
        fn(jqXHR)
      }
    })
  }

  _deleteObject: function(url, fn){
    $.ajax({
      url:this.base+url,
      type:'DELETE',
      success:function(data, textStatus, jqXHR){
        fn(null, data)
      },
      error:function(jqXHR, status, errorThrown){
        fn(jqXHR)
      }
    })
  }

  _putObject: function(url, obj, fn){
    obj = obj ? obj : {}
    $.ajax({
      url:this.base+url,
      type:'PUT',
      contentType:'application/json',
      dataType:'json',
      data:JSON.stringify(obj),
      success:function(data, textStatus, jqXHR){
        fn(null, data)
      },
      error:function(jqXHR, status, errorThrown){
        fn(jqXHR)
      }
    })
  }

  _getObject: function(url,data, fn){
    //data is optional
    if( typeof data === 'function' && fn === undefined) {
      fn = data
      obj = undefined
    }

    $.ajax({
      url:this.base+url,
      contentType:'application/json',
      dataType:'json',
      data:obj,
      success:function(data, textStatus, jqXHR){
        fn(null, data, jqXHR)
      },
      error:function(jqXHR, status, errorThrown){
        fn(jqXHR)
      }
    })
  }

// ------------- API ---------------

  authenticate: function(credentials,cb){
    cb(null,{status:'wrong_login'})
  },

  createNewUser: function(data,cb){
    cb()
  }
}