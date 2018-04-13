import axios from 'axios';
import setAuthorizationToken from '../src/utils/setAuthorizationToken';

describe('Sets user token credential', () => {
  afterEach(() => {
    delete axios.defaults.headers.common.Authorization;
  });
  it('Should assign token to axios', (done) => {
    setAuthorizationToken('token');
    expect(axios.defaults.headers.common.Authorization).toBe('Bearer token');
    done();
  });
});
