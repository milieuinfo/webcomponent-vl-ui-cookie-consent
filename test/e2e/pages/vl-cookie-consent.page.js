const { Page, Config } = require('vl-ui-core');

class VlCookieConsentPage extends Page {

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-cookie-consent.html');
    }

}

module.exports = VlCookieConsentPage;
