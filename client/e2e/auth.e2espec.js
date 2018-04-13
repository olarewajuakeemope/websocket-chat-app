const { url, timeout } = require('../e2eSetup');

module.exports = {
  Auth: browser =>
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
      .saveScreenshot('chat-login.png')
      .end(),

  'Logout': function (browser) { //eslint-disable-line
    browser
      .url(url)
      .waitForElementVisible('body', timeout)
      .assert.urlEquals('http://localhost:3000/')
      .setValue('input[name=username]', 'taiwo')
      .setValue('input[name=password]', 'kehinde')
      .click('input[type=button]')
      .pause(6000)
      .waitForElementVisible('div#messenger', timeout)
      .click('#logout')
      .waitForElementVisible('#login-page', 20000)
      .end();
  },
};
