const { VlElement } = require('vl-ui-core');
const { VlModal } = require('vl-ui-modal');
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

    async bewaarKeuze() {
     return (await this._getModal()).submit();
    }
}

module.exports = VlCookieConsent;
