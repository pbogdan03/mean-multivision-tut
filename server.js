// # 1
var express = require('express'),
    // # 7
    stylus = require('stylus'),
    // # 11
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    // # 13
    mongoose = require('mongoose');


// # 2
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// # 3
var app = express();

// # 8 stylus middleware
function compile(str, path) {
  return stylus(str).set('filename', path);
}

// # 4
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
// # 10 express login middleware
app.use(morgan('dev'));
app.use(bodyParser());
// # 9
app.use(stylus.middleware(
  {
    src: __dirname + '/public',
    compile: compile
  }
));
app.use(express.static(__dirname + '/public'));

// # 14
mongoose.connect('mongodb://localhost/multivision');
var db = mongoose.connection;
// listen to something on mongodb connection
db.on('error', console.error.bind(console, 'connection error...'));
// listen to the open event once
db.once('open', function callback() {
  console.log('multivision db opened');
});
// should put in another file
var messageSchema = mongoose.Schema({
  message: String
});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
// exec executes a callback function
Message.findOne().exec(function(err, messageDoc) {
  mongoMessage = messageDoc.message;
});

// # 12
app.get('/partials/:partialPath', function(req, res) {
  res.render('partials/' + req.params.partialPath);
});

// # 5
app.get('*', function(req, res) {
  res.render('index', {
    // # 15
    mongoMessage: mongoMessage
  });
});

// # 6
var port = 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');