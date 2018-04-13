// TODO: cotinue research on how to test websocket middleware
const WebSocketClient = require('websocket').client;

export default function Chat(token, host, messages) {
  const chatSocket = new WebSocketClient();
  this.messages = [];

  chatSocket.on('connect', (connection) => {
    connection.on('message', (message) => {
      this.messages.push(JSON.parse(message.utf8Data));
    });
    messages.forEach((message) => {
      connection.send(message);
    });
  });

  chatSocket.connect(`ws://localhost:8000/?token=${token}`, null, host);
}
