const { assert, driver } = require('vl-ui-core').Test;
const VlCookieConsentPage = require('./pages/vl-cookie-consent.page');
const Cookie = require('./components/cookie');

describe('vl-cookie-consent', async () => {
    const vlCookieConsentPage = new VlCookieConsentPage(driver);

    before(async () => {
        await driver.manage().deleteAllCookies();

        const cookies = await new Cookie(driver);
        await assert.eventually.isUndefined(cookies.isConsent());
        await assert.eventually.isUndefined(cookies.getConsentDate());
        await assert.eventually.isUndefined(cookies.isOptedInFunctional());

        return vlCookieConsentPage.load();
    });

    it('als gebruiker kan ik de demo-pagina openen en krijg ik de opt-in modal te zien omdat de eerste consent geen auto-open-disabled attribuut heeft', async () => {
        const modal = await vlCookieConsentPage.getConsent();
        await assert.eventually.isTrue(modal.isDisplayed()); 
        await modal.bewaarKeuze();       
    });

    it('als gebruiker kan ik de auto-open-disabled modal bevestigen en worden de juiste cookies gezet', async () => {
        const modal = await vlCookieConsentPage.getConsent();
        
        await assert.eventually.isTrue(modal.isDisplayed());        
        await modal.bewaarKeuze();
        await assert.eventually.isFalse(modal.isDisplayed());
        
        const cookies = await new Cookie(driver);
        await assert.eventually.isTrue(cookies.isConsent());
        await assert.eventually.isNotNull(cookies.getConsentDate());
        await assert.eventually.isTrue(cookies.isOptedInFunctional());
    });

    it('als gebruiker kan ik nogmaals toestemming geven en wordt de consent-date geupdate', async () => {
        await vlCookieConsentPage.openConsent();
        await (await vlCookieConsentPage.getConsent()).bewaarKeuze();
        
        const date1 = await (await new Cookie(driver)).getConsentDate();
        
        await vlCookieConsentPage.openConsent();
        await (await vlCookieConsentPage.getConsent()).bewaarKeuze();
        
        const date2 = await (await new Cookie(driver)).getConsentDate();

        assert.isAbove(date2, date1);
    });

    it('als gebruiker kan ik een cookie-consent zonder functionele opt-in aanvaarden en wordt er enkel een consent en geen functional cookie gezet', async () => {
        await vlCookieConsentPage.openConsentZonderFunctioneleOptIn();
        const modal = await vlCookieConsentPage.getNoFunctionalConsent();
        await modal.bewaarKeuze();

        const cookies = await new Cookie(driver);
        await assert.eventually.isFalse(cookies.isOptedInFunctional());
        await assert.eventually.isTrue(cookies.isConsent());
        await assert.eventually.isNotNull(cookies.getConsentDate());
    });

    it('als gebruiker kan ik een cookie-consent met sociale media opt-in aanvaarden en zal er voor sociale media een cookie gezet worden', async () => {
        await vlCookieConsentPage.openConsentMetExtraOptIn();
        const modal = await vlCookieConsentPage.getExtraOptInConsent();
        const optIn = await modal.getOptIn('Sociale media');
        await optIn.optIn();
        await assert.eventually.isTrue(optIn.isOptedIn());
        await modal.bewaarKeuze();
    });

    it('als gebruiker kan ik een opt-in met default aangevinkte value aanvaarden, en zal deze value als cookie bewaard worden', async () => {
        await vlCookieConsentPage.openConsentMetExtraDefaultOptIn();
        const modal = await vlCookieConsentPage.getExtraOptInDefaultConsent();
        await modal.bewaarKeuze();

        const cookies = await new Cookie(driver);
        await assert.eventually.isTrue(cookies.isSocialConsent());
    });

    it('als gebruiker kan ik een opt-in met verplichte value aanvaarden, en zal deze value als cookie bewaard worden', async () => {
        await vlCookieConsentPage.openConsentMetExtraDefaultVerplicht();
        const modal = await vlCookieConsentPage.getExtraOptInMandatoryConsent();
        await modal.bewaarKeuze();

        const cookies = await new Cookie(driver);
        await assert.eventually.isTrue(cookies.isSocialConsent());
        await assert.eventually.isTrue(cookies.isOptedInFunctional());
    });

    it('als gebruiker kan ik dynamisch een sociale media opt-in toevoegen', async () => {
        await vlCookieConsentPage.openConsentDynamic();
        const modal = await vlCookieConsentPage.getDynamicConsent();
        await consent.getOptIn('Noodzakelijke cookies toestaan (verplicht)')
    })

});
