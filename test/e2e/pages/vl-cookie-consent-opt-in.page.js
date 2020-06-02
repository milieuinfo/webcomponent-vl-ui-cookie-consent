const VlCookieConsentOptIn = require('../components/vl-cookie-consent-opt-in');
const {Page, Config} = require('vl-ui-core').Test;

class VlCookieConsentOptInPage extends Page {
  async _getCookieConsentOptIn(selector) {
    return new VlCookieConsentOptIn(this.driver, selector);
  }

  async getConsentWithLabelAndDescription() {
    return this._getCookieConsentOptIn('#cookie-consent-opt-in-with-label-and-description');
  }

  async getConsentChecked() {
    return this._getCookieConsentOptIn('#cookie-consent-opt-in-checked');
  }

  async getConsentRequired() {
    return this._getCookieConsentOptIn('#cookie-consent-opt-in-required');
  }

  async load() {
    await super.load(Config.baseUrl + '/demo/vl-cookie-consent-opt-in.html');
  }
}

module.exports = VlCookieConsentOptInPage;
