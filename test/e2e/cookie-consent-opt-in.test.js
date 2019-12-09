
const { assert, driver } = require('vl-ui-core').Test;
const VlCookieConsentOptInPage = require('./pages/vl-cookie-consent-opt-in.page');

describe('vl-cookie-consent-opt-in', async () => {
    const vlCookieConsentOptInPage = new VlCookieConsentOptInPage(driver);

    before(() => {
        return vlCookieConsentOptInPage.load();
    });

    after(() => driver && driver.quit());
});
