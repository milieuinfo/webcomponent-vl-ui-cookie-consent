const { assert, driver } = require('vl-ui-core').Test;
const VlCookieConsentPage = require('./pages/vl-cookie-consent.page');
const { Cookies } = require('./components/cookie');

describe('vl-cookie-consent', async () => {
    const vlCookieConsentPage = new VlCookieConsentPage(driver);
    const cookies = new Cookies(driver);

    beforeEach(async () => {
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
        await assert.isUndefined((await cookies.getCookieConsentOptedInFunctionalCookie().value));
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
        await assert.isTrue((await cookies.getCookieConsentOptedInSocialCookie()).value);
    });

    it('als gebruiker kan ik een opt-in met verplichte value aanvaarden, en zal deze value als cookie bewaard worden', async () => {
        await vlCookieConsentPage.openConsentMetExtraDefaultVerplicht();
        const modal = await vlCookieConsentPage.getExtraOptInMandatoryConsent();
        await modal.bewaarKeuze();
        await assert.isTrue((await cookies.getCookieConsentOptedInSocialCookie()).value);
        await assert.isTrue((await cookies.getCookieConsentOptedInFunctionalCookie()).value);
    });

    it('als gebruiker kan ik dynamisch een sociale media opt-in toevoegen', async () => {
        await vlCookieConsentPage.openConsentDynamic();
        const preModal = await vlCookieConsentPage.getDynamicConsent();
        const pre = await preModal.getNumberOfOptIns();
        await preModal.bewaarKeuze();
        await vlCookieConsentPage.voegSocialeMediaOptInToe();
        await vlCookieConsentPage.openConsentDynamic();
        const postModal = await vlCookieConsentPage.getDynamicConsent();
        const post = await postModal.getNumberOfOptIns();

        assert.isAbove(post, pre);
    });

});
