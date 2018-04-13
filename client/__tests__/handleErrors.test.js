import handleErrors from '../src/utils/handleErrors';
require('../__mocks__/documentMock');

describe('Displays error notification', () => {
  it('Should display appropriate error to user', () => {
    handleErrors('test error notification');
    expect(document.getElementById('warning').innerText)
      .toBe('test error notification');
  });
});
