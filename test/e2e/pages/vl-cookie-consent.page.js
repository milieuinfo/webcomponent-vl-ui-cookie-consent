const VlCookieConsent = require('../components/vl-cookie-consent');
const { Page, Config } = require('vl-ui-core');
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
        return (await this.driver.findElement(By.css(selector))).click();
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
        return await this._openConsent('#consent');
    }

    async openConsentZonderFunctioneleOptIn() {
        return await this._openConsent('#consent-noFunctional');
    }

    async openConsentMetExtraOptIn() {
        return await this._openConsent('#consent-optIn');
    }

    async openConsentMetExtraDefaultOptIn() {
        return await this._openConsent('#consent-optIn-default');
    }

    async openConsentMetExtraDefaultVerplicht() {
        return await this._openConsent('#consent-optIn-mandatory');
    }

    async openConsentDynamic() {
        return await this._openConsent('#consent-dynamic');
    }

    async voegSocialeMediaOptInToe() {
        return (await this.driver.findElement(By.css('#add-optIn'))).click();
    }

}

module.exports = VlCookieConsentPage;
