import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import app from '../server';

const request = supertest.agent(app);
chai.use(chaiHttp);

describe('*** Authentication Route ***', () => {
  describe('>>> Login Validation Test', () => {
    it('should return errors for empty fields', (done) => {
      request
      .post('/auth')
      .send({})
      .end((err, res) => {
        if (!err) {
          expect(res.body.identifier)
          .to.equals('Username or email is required');
          expect(res.body.password)
          .to.equals('Password cannot be empty');
        }
        done();
      });
    });
  });

  describe('>>>Login Database Actions', () => {
    it('should return errors for invalid user', (done) => {
      const user = {
        identifier: 'daniel',
        password: 'hello',
      };
      request
      .post('/auth')
      .send(user)
      .end((err, res) => {
        if (!err) {
          expect(res.status)
          .to.equals(400);
          expect(res.body.message)
          .to.equals('User does not exist');
        }
        done();
      });
    });

    it('should return error for wrong password', (done) => {
      const user = {
        identifier: 'opeyemi',
        password: '12345678',
      };

      request
      .post('/auth')
      .send(user)
      .end((err, res) => {
        if (!err) {
          expect(res.status)
          .to.equals(400);
          expect(res.body.message)
          .to.equals('Invalid password');
        }
        done();
      });
    });

    it('should sign a valid user in', (done) => {
      const user = {
        identifier: 'taiwo',
        password: 'kehinde',
      };

      request
      .post('/auth')
      .send(user)
      .end((err, res) => {
        if (!err) {
          expect(res.status)
          .to.equal(200);
          expect(res.body.message)
          .to.equal('Authentication successful!');
          expect(res.body).to.have.property('token');
        }
        done();
      });
    });

    it('should fail on bad request', (done) => {
      const user = {
        identifier: 123456788999998876567899987655677,
        password: '123456',
      };

      request
      .post('/auth')
      .send(user)
      .end((err, res) => {
        if (!err) {
          expect(res.status)
          .to.equal(400);
        }
        done();
      });
    });
  });
});
