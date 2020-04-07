const VlCookieConsent = require('../components/vl-cookie-consent');
const { Page, Config } = require('vl-ui-core').Test;
const { By, until } = require('selenium-webdriver');

class VlCookieConsentPage extends Page {
    async load() {
        await super.load(Config.baseUrl + '/demo/vl-cookie-consent.html');
    }

    async _getConsent(number) {
        const element = await this.driver.findElement(By.css(`#cookie-consent-${number}`));
        return new VlCookieConsent(this.driver, element);
    }

    async _openConsent(number) {
        const consent = await this.driver.findElement(By.css(`#button-open-cookie-consent-${number}`));
        await this.driver.wait(until.elementIsVisible(consent), 3000);
        await this.driver.wait(until.elementIsEnabled(consent), 3000);
        await consent.click();
    }

    async getConsent() {
        return this._getConsent(1);
    }

    async getNoFunctionalConsent() {
        return this._getConsent(2);
    }

    async getExtraOptInConsent() {
        return this._getConsent(3);
    }

    async getExtraOptInDefaultConsent() {
        return this._getConsent(4);
    }

    async getExtraOptInMandatoryConsent() {
        return this._getConsent(5);
    }

    async getDynamicConsent() {
        return this._getConsent(6);
    }

    async getDynamicTextConsent() {
        return this._getConsent(7);
    }

    async openConsent() {
        await this._openConsent(1);
    }

    async openNoFunctionalConsent() {
        await this._openConsent(2);
    }

    async openExtraOptInConsent() {
        await this._openConsent(3);
    }

    async openExtraOptInDefaultConsent() {
        await this._openConsent(4);
    }

    async openExtraOptInMandatoryConsent() {
        await this._openConsent(5);
    }

    async openDynamicConsent() {
        await this._openConsent(6);
    }

    async openDynamicTextConsent() {
        await this._openConsent(7);
    }

    async voegSocialeMediaOptInToe() {
        await (await this.driver.findElement(By.css('#button-add-cookie-consent-opt-in'))).click();
    }

}

module.exports = VlCookieConsentPage;
