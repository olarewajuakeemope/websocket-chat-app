const { url, timeout } = require('../e2eSetup');

module.exports = {
  Chat: browser =>
    browser
      .url(url)
      .waitForElementVisible('body', 1000)
      .assert.urlEquals('http://localhost:3000/')
      .assert.title('My Chat App')
      .waitForElementVisible('input[name=username]', 1000)
      .setValue('input[name=username]', 'opeyemi')
      .waitForElementVisible('input[name=password]', 1000)
      .setValue('input[name=password]', 'olarewaju')
      .waitForElementVisible('input[type=button]', 1000)
      .click('input[type=button]')
      .waitForElementVisible('div#messenger', timeout)
      .setValue('textarea[name=message-input]', 'test message')
      .click('span#submit-message')
      .waitForElementVisible('div.message-body', 1000)
      .assert.containsText('div.message-body', 'test message')
      .end(),
};
