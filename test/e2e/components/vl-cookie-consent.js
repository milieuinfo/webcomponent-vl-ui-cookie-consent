const { VlElement } = require('vl-ui-core');
const { By, until } = require('selenium-webdriver');
const { VlModal } = require('vl-ui-modal');

class VlCookieConsent extends VlElement {

    async _getModal() {
        return new VlModal(this.driver, this.shadowRoot);
    }

    async isDisplayed() {
        return (await this._getModal()).isDisplayed();
    }

    async bewaarKeuze() {
     return (await this._getModal()).submit();
    }
}

module.exports = VlCookieConsent;
