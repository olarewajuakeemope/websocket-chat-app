import { Server } from 'mock-socket';
import Messenger from '../src/js/messenger';
import { messageResponse } from '../__mocks__/messageMock';

require('../__mocks__/documentMock');

const doc = document;
const win = window;

describe('Messenger tests', () => {
  let mockServer;
  beforeEach(() => {
    mockServer = new Server('ws://127.0.0.1:8000/?token=token');
  });

  afterEach((done) => {
    setTimeout(() => {
      mockServer.stop(done);
    }, 100);
  });

  describe('Server responds with message type data', () => {
    it('server returns type message object', () => {
      mockServer.on('connection', () => {
        mockServer.send(JSON.stringify(messageResponse));
      });
      Messenger(doc, win, 'opeyemi', 'token');

      setTimeout(() => {
        expect(doc.getElementsByClassName('message-name').length).toBe(1);
        expect(doc.getElementsByClassName('message-body').length).toBe(1);
        expect(doc.getElementsByClassName('message-timestamp').length).toBe(1);
        expect(doc.getElementsByClassName('message').length).toBe(1);
        expect(doc.getElementsByClassName('message-to').length).toBe(1);
        expect(doc.getElementsByClassName('message-from').length).toBe(0);
      }, 1000);
    });

    it('message display from other authors should have class message-from', () => {
      mockServer.on('connection', () => {
        mockServer.send(JSON.stringify(messageResponse));
      });
      Messenger(doc, win, 'taiwo', 'token');

      setTimeout(() => {
        expect(doc.getElementsByClassName('message-from').length).toBe(1);
      }, 1000);
    });

    it('user should be notfied if browser does not support websocket', () => {
      mockServer.on('connection', () => {
        mockServer.send(JSON.stringify(messageResponse));
      });
      win.WebSocket = null;
      Messenger(doc, win, 'taiwo', 'token');

      setTimeout(() => {
        expect(doc.getElementById('message-input').value)
          .toBe('Sorry, but your browser doesn\'t support WebSocket.');
      }, 1000);
    });

    it('user should not be connected to socket if token is invalid', () => {
      doc.getElementById('message-input').value = '';
      mockServer.stop();
      mockServer = new Server('ws://127.0.0.1:8000/?token=invalidToken');
      Messenger(doc, win, 'taiwo', 'token');

      setTimeout(() => {
        expect(doc.getElementById('message-input').value)
          .toBe('Unable to communicate with the WebSocket server. Try logging in again');
      }, 1000);
    });
  });
});
