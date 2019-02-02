"use strict";

const http         = require('http');
const finalhandler = require('finalhandler');
const Router       = require('router');
const bodyParser = require('body-parser');
let messages = [];
let nextId = 1;

class Message {
  constructor(message) {
    this.id = nextId;
    this.message = message;
    nextId++;
  }
}

const router = new Router();
router.use(bodyParser.json());

router.get('/', (request, response) => {
  // A good place to start!
  response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.write("Hello, World!")
  response.end();
});

router.post('/message',(request,response)=>{
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  let newMessage = new Message(request.body.message)
  messages.push(newMessage)
  response.end(JSON.stringify(newMessage.id));
});

const server = http.createServer((request, response) => {
  router(request, response, finalhandler(request, response));
});

exports.listen = function(port, callback) {
  server.listen(port, callback);
};

exports.close = function(callback) {
  server.close(callback);
};
