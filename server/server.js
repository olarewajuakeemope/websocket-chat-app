import express from 'express';
import bodyParser from 'body-parser';
import * as http from 'http';
import auth from './routes/auth';
import * as helper from './utils/helpers';
import authenticateUser from './routes/middlewares/authenticateUsers';

const WebSocketServer = require('websocket').server;

const app = express();
const webSocketsServerPort = 8000;

let history = [];
const clients = [];

// Array with some colors
const colors = [
  'red',
  'green',
  'blue',
  'magenta',
  'purple',
  'plum',
  'orange',
];

// ... in random order
colors.sort(() => (Math.random() > 0.5));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use('/auth', auth);

// initialize a simple http server
const server = http.createServer(app);

server.listen(process.env.PORT || webSocketsServerPort);

const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

wsServer.on('request', (request) => {
  const { origin, resourceURL } = request;

  // TODO: set token as cookie in the frontend
  if (!helper.originIsAllowed(origin) || !authenticateUser(resourceURL.query.token)) {
    request.reject();
    return;
  }

  const connection = request.accept(null, request.origin);

  // we need to know client index to remove them on 'close' event
  const index = clients.push(connection) - 1;
  let userName = false;
  let userColor = false;

  // send back chat history
  if (history.length > 0 && !userName) {
    connection.sendUTF(
        JSON.stringify({
          type: 'history',
          data: history,
        }),
      );
  }

  // user sent some message
  connection.on('message', (message) => {
    if (message.type === 'utf8') { // accept only text
      if (userName === false) {
        // remember user name and color
        userName = message.utf8Data;
        userColor = colors.shift();
      } else {
        // we want to keep history of all sent messages
        const obj = {
          time: (new Date()).getTime(),
          text: helper.htmlEntities(message.utf8Data),
          author: userName,
          color: userColor,
        };

        history.push(obj);
        history = history.slice(-100);

        // broadcast message to all connected clients
        const json = JSON.stringify({
          type: 'message',
          data: obj,
        });

        for (let i = 0; i < clients.length; i += 1) {
          clients[i].sendUTF(json);
        }
      }
    }
  });

  // user disconnected
  connection.on('close', () => {
    if (userName !== false && userColor !== false) {
      // remove color and user from the list of connected clients
      clients.splice(index, 1);
      colors.push(userColor);
    }
  });
});

export default server;
