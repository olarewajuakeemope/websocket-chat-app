import { handleLogout } from '../src/js/logout';
import localStorage from '../__mocks__/localStorageMock';

describe('Logout Action', () => {
  it('Logs a user out and unsets token', (done) => {
    localStorage.setItem('jwtTokex', 'testtoken');
    handleLogout();
    expect(localStorage.getItem('jwtToken')).toBe(undefined);
    done();
  });
});

