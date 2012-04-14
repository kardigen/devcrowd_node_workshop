
/**
 * Module dependencies.
 */

var
  express         = require('express'),
  RedisStore      = require('connect-redis')(express),
  mongoose        = require('mongoose'),
  User            = require('./models/user')



// setup db connection
mongoose.connection.on('error',function(err){
  throw new Error('DB connection error: ' + err)
})
mongoose.connect('mongodb://localhost/test')

var app = module.exports = express.createServer();

// Configuration



app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  /* set jade engine inherence available */
  app.set('view options', { layout: false });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());

  //initialize redis session support
  app.use(express.session({
    key: 'cookieId',
    secret: 'cookieSecret',
    store: new RedisStore,
    maxAge: 12*60*60*1000 //sessionMaxAge msec
  }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(express.static(__dirname + '/client_tests'));
  app.use(express.static(__dirname + '/views'));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', function(req, res){
  res.render('index', { title: 'Express' })
});

app.post('/users', function(req, res){
  var login = req.param('login')
  var password = req.param('password')

  if( login && login.length && password && password.length){
    User.create({login:login,password:password}, function(err){
      if(err){
        res.send(400)
      } else {
        res.send({},201)
      }
    })
  } else {
    res.send(400)
  }
});

app.post('/authentication',function(req,res){
  var login = req.param('login')
  var password = req.param('password')
  if( login && login.length && password && password.length){
    User.authenticate({login:login,password:password}, function(err,status){
      if(err){ res.send(500) }
      else{
        res.send({status:status})
      }
    })
  } else {
    res.send(400)
  }
})

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
