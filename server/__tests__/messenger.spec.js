import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import app from '../server';
import Chat from './helpers/mockWebsocket';

// TODO: cotinue research on how to test websocket middleware
const request = supertest.agent(app);
chai.use(chaiHttp);

const user = {
  identifier: 'taiwo',
  password: 'kehinde',
};
const messages = [
  'author',
  'message two',
  'message three',
];

describe('Chat functionalities', () => {
  it('Socket works perfectly with correct host and user details', (done) => {
    let chatApp;
    request
    .post('/auth')
    .send(user)
    .end((err, res) => {
      if (!err) {
        chatApp = new Chat(res.body.token, 'http://localhost:3000', messages);
      }
    });
    setTimeout(() => {
      const messageLen = chatApp.messages.length;
      expect(messageLen).to.equal(2);
      done();
    }, 100);
  });

  it('Socket rejects logged in user from foreign host', (done) => {
    let chatApp;
    request
    .post('/auth')
    .send(user)
    .end((err, res) => {
      if (!err) {
        chatApp = new Chat(res.body.token, 'http://localhost:1447', messages);
      }
    });
    setTimeout(() => {
      const messageLen = chatApp.messages.length;
      expect(messageLen).to.equal(0);
      done();
    }, 100);
  });

  it('Socket rejects logged out user', (done) => {
    const chatApp = new Chat(null, 'http://localhost:3000', messages);
    setTimeout(() => {
      const messageLen = chatApp.messages.length;
      expect(messageLen).to.equal(0);
      done();
    }, 100);
  });

  it('Socket responds with correct messages to user', (done) => {
    let chatApp;
    request
    .post('/auth')
    .send(user)
    .end((err, res) => {
      if (!err) {
        chatApp = new Chat(res.body.token, 'http://localhost:3000', messages);
      }
    });

    setTimeout(() => {
      const socketRes = chatApp.messages;
      expect(socketRes.length).to.equal(3);
      expect(socketRes[0].type).to.equal('history');
      expect(socketRes[1].type).to.equal('message');
      expect(socketRes[2].type).to.equal('message');
      expect(socketRes[1].data.text).to.equal('message two');
      expect(socketRes[2].data.text).to.equal('message three');
      expect(socketRes[1].data.author).to.equal('author');
      expect(socketRes[2].data.author).to.equal('author');
      done();
    }, 100);
  });
});
