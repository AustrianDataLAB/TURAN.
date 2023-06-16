const { By, Builder, Browser } = require('selenium-webdriver');
// import suite from require('selenium-webdriver/testing');
// import suite from 'selenium-webdriver/testing';
const assert = require('assert');
const suite = require('selenium-webdriver/testing');
const Chrome = require('selenium-webdriver/chrome');
const options = new Chrome.Options();

const TITLE = 'Apache Guacamole';
const KEYCLOAK_TITLE = 'Sign in to turandot';

const USERNAME = 'testuser';
const PASSWORD = 'test';

const LOGOUT_MSG = 'You have been logged out.';

suite.suite(
  function (env) {
    describe('First script', function () {
      let driver;

      before(async function () {
        driver = await env
          .builder()
          .setChromeOptions(options.addArguments('--headless=new'))
          .withCapabilities({
            browserName: 'chrome',
            acceptSslCerts: true,
            acceptInsecureCerts: true,
          })
          .build();
        /*
        driver = await new Builder().withCapabilities({
          browserName: 'firefox',
          acceptSslCerts: true,
          acceptInsecureCerts: true,
        });*/
      });

      it('Test login and logout functionality', async function () {
        await driver.get('https://localhost/guacamole/');
        await driver.manage().setTimeouts({ implicit: 3000 });

        let title = await driver.getTitle();
        assert.equal(TITLE, title);

        const samlButton = await driver.findElement(
          By.css('.sso-provider > .ng-binding')
        );
        await samlButton.click();

        // On the keycloak page
        title = await driver.getTitle();
        assert.equal(KEYCLOAK_TITLE, title);

        // Find field username and fill it out
        const username = await driver.findElement(By.id('username'));
        await username.sendKeys(USERNAME);

        // Find field password and enter password
        const password = await driver.findElement(By.id('password'));
        await password.sendKeys(PASSWORD);

        // Click on the Sign in Button
        const signInButton = await driver.findElement(By.id('kc-login'));
        await signInButton.click();

        // Check if we are logged in
        const signinName = await driver.findElement(By.css('.menu-title'));
        assert.equal(USERNAME, await signinName.getText());

        // Click on the menu button
        const menu = await driver.findElement(By.css('.menu-dropdown'));
        await menu.click();

        // Logout again and click the button
        const logoutButton = await driver.findElement(By.css('.logout'));
        await logoutButton.click();

        // Check if we are displayed with the logout msg
        const logoutMsg = await driver.findElement(
          By.css('.notification > .ng-scope')
        );
        assert.equal(LOGOUT_MSG, await logoutMsg.getText());

        await driver.quit();
      });
    });
  },
  { browsers: [Browser.CHROME] }
);
