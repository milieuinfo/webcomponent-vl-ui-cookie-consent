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
        await this._closeConsent();
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

    async openConsent() {
        return this._openConsent('#consent');
    }

    async openConsentZonderFunctioneleOptIn() {
        return this._openConsent('#consent-noFunctional');
    }

    async openConsentMetExtraOptIn() {
        return this._openConsent('#consent-optIn');
    }

    async _closeConsent() {
        const consent = await this.getConsent();
        try {
            const displayed = await consent.isDisplayed();
            if (displayed) {
                await consent.bewaarKeuze();
            }
        } catch {}
    }
}

module.exports = VlCookieConsentPage;
