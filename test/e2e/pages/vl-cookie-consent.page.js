const VlCookieConsent = require('../components/vl-cookie-consent');
const { Page, Config } = require('vl-ui-core');
const { By } = require('selenium-webdriver');

class VlCookieConsentPage extends Page {

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-cookie-consent.html');
    }

    async getConsent1() {
        const element = await this.driver.findElement(By.css('#cookie-consent-1'));
        return new VlCookieConsent(this.driver, element);
    }

}

module.exports = VlCookieConsentPage;
