const { VlElement } = require('vl-ui-core');
const { VlModal } = require('vl-ui-modal');

class VlCookieConsent extends VlElement {

    async _getModal() {
        return new VlModal(this.driver, this.shadowRoot);
    }

    async isDisplayed() {
        return (await this._getModal()).isDisplayed();
    }

    async getOptIn(label) {
        const modal = await this._getModal();
        await modal.findElement(By.css('vl-cookie-consent-opt-in[data-vl-label="' + label + '"]'))
    }

    async bewaarKeuze() {
     return (await this._getModal()).submit();
    }
}

module.exports = VlCookieConsent;
