const VlCookieConsent = require('../components/vl-cookie-consent');
const { Page, Config } = require('vl-ui-core');
const { By } = require('selenium-webdriver');

class VlCookieConsentPage extends Page {

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-cookie-consent.html');
    }

    async _getConsent(selector) {
        const element = await this.driver.findElement(By.css(selector));
        return new VlCookieConsent(this.driver, element);
    }
    
    async getConsent() {
        return this._getConsent('#cookie-consent-1');
    }

    async getNoFunctionalConsent() {
        return this._getConsent('#cookie-consent-2');
    }

    async getExtraOptInConsent() {
        return this._getConsent('#cookie-consent-3');
    }

    async openConsent() {
        return (await this.driver.findElement(By.css('#consent'))).click();
    }

    async openConsentZonderFunctioneleOptIn() {
        return (await this.driver.findElement(By.css('#consent-noFunctional'))).click();
    }

    async openConsentMetExtraOptIn() {
        return (await this.driver.findElement(By.css('#consent-optIn-default'))).click();
    }

}

module.exports = VlCookieConsentPage;
