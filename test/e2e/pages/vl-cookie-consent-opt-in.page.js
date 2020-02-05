const VlCookieConsentOptIn = require('../components/vl-cookie-consent-opt-in');
const { Page, Config } = require('vl-ui-core').Test;

class VlCookieConsentOptInPage extends Page {

    async _getCookieConsentOptIn(selector) {
        return new VlCookieConsentOptIn(this.driver, selector);
    }

    async getConsentMetLabel() {
        return this._getCookieConsentOptIn('#label');
    }

    async getConsentMetLabelEnBeschrijving() {
        return this._getCookieConsentOptIn('#label-beschrijving');
    }

    async getConsentMetLabelEnAangevinkt() {
        return this._getCookieConsentOptIn('#label-checked');
    }

    async getConsentMetLabelEnVerplicht() {
        return this._getCookieConsentOptIn('#label-verplicht');
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-cookie-consent-opt-in.html');
    }

}

module.exports = VlCookieConsentOptInPage;
