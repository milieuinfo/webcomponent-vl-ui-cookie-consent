
const { assert, driver } = require('vl-ui-core').Test;
const VlCookieConsentOptInPage = require('./pages/vl-cookie-consent-opt-in.page');

describe('vl-cookie-consent-opt-in', async () => {
    const vlCookieConsentOptInPage = new VlCookieConsentOptInPage(driver);

    before(() => {
        return vlCookieConsentOptInPage.load();
    });

    it('ik kan een opt-in met label aanvinken', async () => {
        const optIn = await vlCookieConsentOptInPage.getConsentMetLabel();
        await assert.eventually.isFalse(optIn.isOptedIn());
        await optIn.optIn();
        await assert.eventually.isTrue(optIn.isOptedIn());
    });

    after(() => driver && driver.quit());
});
