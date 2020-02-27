const { VlElement } = require('vl-ui-core').Test;
const { VlModal } = require('vl-ui-modal').Test;
const { By } = require('selenium-webdriver');
const VlCookieConsentOptIn = require('../components/vl-cookie-consent-opt-in');

class VlCookieConsent extends VlElement {
    async _getModal() {
        return new VlModal(this.driver, this.shadowRoot);
    }

    async isDisplayed() {
        const modal = await this._getModal();
        return modal.isDisplayed();
    }

    async getOptIn(label) {
        const optIns = await this.getOptIns();
        for (let i = 0; i < optIns.length; i++) {
            const optIn = optIns[i];
            if (await optIn.getLabel() === label) {
                return optIn;
            }
        }
    }

    async getOptIns() {
        const modal = await this._getModal();
        const optIns = await modal.findElements(By.css('vl-cookie-consent-opt-in'));
        return Promise.all(optIns.map(optIn => new VlCookieConsentOptIn(this.driver, optIn)));
    }

    async bewaarKeuze() {
        await (await this._getModal()).submit();
    }
}

module.exports = VlCookieConsent;
