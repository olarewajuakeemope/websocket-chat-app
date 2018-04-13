import displayMessenger from '../src/utils/displayMessenger';
require('../__mocks__/documentMock');

describe('Toggles messenger div visiblity', () => {
  it('Should hide login page and display messenger', () => {
    displayMessenger(true);
    expect(document.getElementById('messenger').style.display).toBe('block');
    expect(document.getElementById('login-page').style.display).toBe('none');
  });
});

