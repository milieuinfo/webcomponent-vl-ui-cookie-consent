
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

    it('ik kan een opt-in met label en beschrijving aanvinken', async () => {
        const optIn = await vlCookieConsentOptInPage.getConsentMetLabelEnBeschrijving();
        await assert.eventually.isFalse(optIn.isOptedIn());
        await optIn.optIn();
        await assert.eventually.isTrue(optIn.isOptedIn());
    });

    it('ik kan een opt-in met label en standaard aangevinkt, uitvinken', async () => {
        const optIn = await vlCookieConsentOptInPage.getConsentMetLabelEnAangevinkt();
        await assert.eventually.isTrue(optIn.isOptedIn());
        await optIn.optIn();
        await assert.eventually.isFalse(optIn.isOptedIn());
    });

    it('ik kan een verplichte opt-in niet uitvinken', async () => {
        const optIn = await vlCookieConsentOptInPage.getConsentMetLabelEnVerplicht();
        await assert.eventually.isTrue(optIn.isOptedIn());
        await optIn.optIn();
        await assert.eventually.isTrue(optIn.isOptedIn());
    });

});
