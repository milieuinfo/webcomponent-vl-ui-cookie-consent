
const { assert, driver } = require('vl-ui-core').Test;
const VlCookieConsentPage = require('./pages/vl-cookie-consent.page');

describe('vl-checkbox', async () => {
    const vlCookieConsentPage = new VlCookieConsentPage(driver);

    before(() => {
        return vlCookieConsentPage.load();
    });

    after(() => driver && driver.quit());
});
