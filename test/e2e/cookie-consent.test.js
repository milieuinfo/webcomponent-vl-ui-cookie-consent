const { assert, driver } = require('vl-ui-core').Test;
const VlCookieConsentPage = require('./pages/vl-cookie-consent.page');
const { Cookies } = require('./components/cookie');

describe('vl-cookie-consent', async () => {
    const vlCookieConsentPage = new VlCookieConsentPage(driver);
    let cookies;

    before(async () => {
        cookies = await new Cookies(driver);
        await driver.manage().deleteAllCookies();
        return vlCookieConsentPage.load();
    });

    it('als gebruiker kan ik de demo-pagina openen en krijg ik de opt-in modal te zien omdat de eerste consent geen auto-open-disabled attribuut heeft', async () => {
        const modal = await vlCookieConsentPage.getConsent();
        await assert.eventually.isTrue(modal.isDisplayed());
        await modal.bewaarKeuze();
    });

    it('als gebruiker kan ik de auto-open-disabled modal bevestigen en worden de juiste cookies gezet', async () => {
        await vlCookieConsentPage.openConsent();
        const modal = await vlCookieConsentPage.getConsent();
        
        await assert.eventually.isTrue(modal.isDisplayed());        
        await modal.bewaarKeuze();
        await assert.eventually.isFalse(modal.isDisplayed());

        assert.isTrue((await cookies.getCookieConsentCookie()).value);
        assert.isNotNull((await cookies.getCookieConsentDateCookie()).value);
        assert.isTrue((await cookies.getCookieConsentOptedInFunctionalCookie()).value);
    });

    it('als gebruiker kan ik nogmaals toestemming geven en wordt de consent-date geupdate', async () => {
        await vlCookieConsentPage.openConsent();
        await (await vlCookieConsentPage.getConsent()).bewaarKeuze();
        
        const date1 = (await cookies.getCookieConsentDateCookie()).value;
        
        await vlCookieConsentPage.openConsent();
        await (await vlCookieConsentPage.getConsent()).bewaarKeuze();
        
        const date2 = (await cookies.getCookieConsentDateCookie()).value;

        assert.isAbove(date2, date1);
    });

    it('als gebruiker kan ik een cookie-consent zonder functionele opt-in aanvaarden en wordt er enkel een consent en geen functional cookie gezet', async () => {
        await vlCookieConsentPage.openConsentZonderFunctioneleOptIn();
        const modal = await vlCookieConsentPage.getNoFunctionalConsent();
        await modal.bewaarKeuze();

        await assert.isTrue((await cookies.getCookieConsentCookie()).value);
        await assert.isNotNull((await cookies.getCookieConsentDateCookie()).value);
        await assert.isFalse((await cookies.getCookieConsentOptedInFunctionalCookie()).value);
    });

    it('als gebruiker kan ik een cookie-consent met sociale media opt-in aanvaarden en zal er voor sociale media een cookie gezet worden', async () => {
        await vlCookieConsentPage.openConsentMetExtraOptIn();
        const modal = await vlCookieConsentPage.getExtraOptInConsent();
        const optIn = await modal.getOptIn('Sociale media');
        await optIn.optIn();
        await assert.eventually.isTrue(optIn.isOptedIn());
        await modal.bewaarKeuze();
    });
});
