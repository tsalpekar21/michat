var express = require('express')
var app = express();
var router = express.Router();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = __dirname + '/views/';
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var hbs = require('hbs');
//var bodyParser = require('body-parser');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
app.engine('html', hbs.__express);

router.use(function (req,res,next) {
  console.log("/ Method: " + req.method);
  next();
});

router.get('/', function(req, res) {
  //res.sendFile(path + 'index.html');
  res.render('index');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

app.use("/", router);

http.listen(app.get('port') || 3000, function(){
  console.log('listening on *:3000');
});

