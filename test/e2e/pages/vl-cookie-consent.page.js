const VlCookieConsent = require('../components/vl-cookie-consent');
const { Page, Config } = require('vl-ui-core').Test;
const { By, until } = require('selenium-webdriver');

class VlCookieConsentPage extends Page {
    async load() {
        await super.load(Config.baseUrl + '/demo/vl-cookie-consent.html');
    }

    async _getConsent(selector) {
        const element = await this.driver.findElement(By.css(selector));
        return new VlCookieConsent(this.driver, element);
    }

    async _openConsent(selector) {
        const consent = await this.driver.findElement(By.css(selector));
        await this.driver.wait(until.elementIsVisible(consent), 3000);
        await this.driver.wait(until.elementIsEnabled(consent), 3000);
        return consent.click();
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

    async getExtraOptInDefaultConsent() {
        return this._getConsent('#cookie-consent-4');
    }

    async getExtraOptInMandatoryConsent() {
        return this._getConsent('#cookie-consent-5');
    }

    async getDynamicConsent() {
        return this._getConsent('#cookie-consent-6');
    }

    async openConsent() {
        return await this._openConsent('#button-open-cookie-consent-1');
    }

    async openConsentZonderFunctioneleOptIn() {
        return await this._openConsent('#button-open-cookie-consent-2');
    }

    async openConsentMetExtraOptIn() {
        return await this._openConsent('#button-open-cookie-consent-3');
    }

    async openConsentMetExtraDefaultOptIn() {
        return await this._openConsent('#button-open-cookie-consent-4');
    }

    async openConsentMetExtraDefaultVerplicht() {
        return await this._openConsent('#button-open-cookie-consent-5');
    }

    async openConsentDynamic() {
        return await this._openConsent('#button-open-cookie-consent-6');
    }

    async voegSocialeMediaOptInToe() {
        return (await this.driver.findElement(By.css('#button-add-cookie-consent-opt-in'))).click();
    }

}

module.exports = VlCookieConsentPage;
