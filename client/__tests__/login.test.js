import moxios from 'moxios';
import { loginAction } from '../src/js/login';

describe('Login Action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('Test login functionality', () => {
    it('Logs a user in', (done) => {
      moxios.stubRequest('http://localhost:8000/auth', {
        status: 200,
        response: {
          token: 'jdsefefrefreferff',
        },
      });
      loginAction({ identifier: 'daniel' });
      done();
    });
  });
});
