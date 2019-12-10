const { assert, driver } = require('vl-ui-core').Test;
const VlCookieConsentPage = require('./pages/vl-cookie-consent.page');
const Cookie = require('./components/cookie');

describe('vl-cookie-consent', async () => {
    const vlCookieConsentPage = new VlCookieConsentPage(driver);

    before(async () => {
        await driver.manage().deleteAllCookies()
        return vlCookieConsentPage.load();
    });

    it('als ik de demo-pagina open, krijg ik de opt-in modal te zien omdat de eerste consent geen auto-open-disabled attribuut heeft', async () => {
        const consent = await vlCookieConsentPage.getConsent1();
        
        await assert.eventually.isTrue(consent.isDisplayed());        
    });

    it('als ik de demo-pagina open, zijn er nog geen cookies gezet', async () => {
        const cookies = await new Cookie(driver);
        
        await assert.eventually.isUndefined(cookies.isConsent());
        await assert.eventually.isUndefined(cookies.isConsentDateSet());
        await assert.eventually.isUndefined(cookies.isOptedInFunctional());
    });

    it('als ik op \'Bewaar keuze\' klik in de auto-open-disabled modal, sluit de modal en worden de juiste cookies gezet', async () => {
        const consent = await vlCookieConsentPage.getConsent1();
        
        await assert.eventually.isTrue(consent.isDisplayed());        
        await consent.bewaarKeuze();
        await assert.eventually.isFalse(consent.isDisplayed());
        
        const cookies = await new Cookie(driver);
        await assert.eventually.isTrue(cookies.isConsent());
        await assert.eventually.isNotNull(cookies.isConsentDateSet());
        await assert.eventually.isTrue(cookies.isOptedInFunctional());
    });

});
