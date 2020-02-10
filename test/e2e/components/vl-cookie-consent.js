const { VlElement } = require('vl-ui-core').Test;
const { VlModal } = require('vl-ui-modal').Test;
const { By } = require('selenium-webdriver');
const VlCookieConsentOptIn = require('../components/vl-cookie-consent-opt-in');

class VlCookieConsent extends VlElement {
    async _getModal() {
        return new VlModal(this.driver, this.shadowRoot);
    }

    async isDisplayed() {
        return (await this._getModal()).isDisplayed();
    }

    async getOptIn(label) {
        const modal = await this._getModal();
        const element = await modal.findElement(By.css('vl-cookie-consent-opt-in[data-vl-label="' + label + '"]'));
        return new VlCookieConsentOptIn(this.driver, element);
    }

    async getOptIns() {
        const modal = await this._getModal();
        const optIns = await modal.findElements(By.css('vl-cookie-consent-opt-in'));
        return optIns.map(async (optIn) => {
            return await new VlCookieConsentOptIn(this.driver, optIn);
        });
    }

    async bewaarKeuze() {
        return (await this._getModal()).submit();
    }
}

module.exports = VlCookieConsent;
