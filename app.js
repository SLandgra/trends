const app = require('express')();
const logger = require('morgan');
const routes =  require('./routes');
const cors = require('cors')

let server = require('http').Server(app);
let io = require('socket.io')(server);
let sockets = require('./sockets/sockets.js')(io)

app.use(cors());
app.use('/', routes);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    error: err
  })
});


const port = process.env.PORT || 3000;
server.listen(port, ()=>{
  console.log('Express started. Listening on port %s', port);
});
