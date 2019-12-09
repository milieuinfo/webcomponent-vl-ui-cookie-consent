const VlCookieConsentOptInPage = require('../components/vl-cookie-consent-opt-in');
const { Page, Config } = require('vl-ui-core');

class VlCookieConsentOptInPage extends Page {

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-cookie-consent-opt-in.html');
    }

}

module.exports = VlCookieConsentOptInPage;
