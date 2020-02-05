const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlCookieConsentPage = require('./pages/vl-cookie-consent.page');
const CookieManager = require('./components/cookie-manager');

describe('vl-cookie-consent', async () => {
    const vlCookieConsentPage = new VlCookieConsentPage(driver);
    const cookies = new CookieManager(driver);

    beforeEach(async () => {
        await driver.manage().deleteAllCookies();
        return vlCookieConsentPage.load();
    });

    it('als gebruiker kan ik de demo-pagina openen en krijg ik de opt-in modal te zien omdat de eerste consent geen auto-open-disabled attribuut heeft', async () => {
        await vlCookieConsentPage.openConsent();
        const modal = await vlCookieConsentPage.getConsent();
        await assert.eventually.isTrue(modal.isDisplayed());
        await modal.bewaarKeuze();
    });

    it('als gebruiker kan ik de auto-open-disabled modal bevestigen en worden de juiste cookies gezet', async () => {
        await vlCookieConsentPage.openConsent();
        const consentModal = await vlCookieConsentPage.getConsent();     
        
        await assert.eventually.isTrue(consentModal.isDisplayed());    
        await consentModal.bewaarKeuze();
        await assert.eventually.isFalse(consentModal.isDisplayed());
        
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
        const consentModal = await vlCookieConsentPage.getNoFunctionalConsent();
        
        await consentModal.bewaarKeuze();
        
        await assert.isTrue((await cookies.getCookieConsentCookie()).value);
        await assert.isNotNull((await cookies.getCookieConsentDateCookie()).value);
        await assert.isUndefined((await cookies.getCookieConsentOptedInFunctionalCookie().value));
    });

    it('als gebruiker kan ik een cookie-consent met sociale media opt-in aanvaarden en zal er voor sociale media een cookie gezet worden', async () => {
        await vlCookieConsentPage.openConsentMetExtraOptIn();
        const consentModal = await vlCookieConsentPage.getExtraOptInConsent();
        const optIn = await consentModal.getOptIn('Sociale media');
        await optIn.optIn();
        await assert.eventually.isTrue(optIn.isOptedIn());
        await consentModal.bewaarKeuze();
    });

    it('als gebruiker kan ik een cookie consent met een default aangevinkte opt-in aanvaarden, en zal deze opt-in als cookie bewaard worden', async () => {
        await vlCookieConsentPage.openConsentMetExtraDefaultOptIn();
        const consentModal = await vlCookieConsentPage.getExtraOptInDefaultConsent();
        await consentModal.bewaarKeuze();
        await assert.isTrue((await cookies.getCookieConsentOptedInSocialCookie()).value);
    });

    it('als gebruiker kan ik een cookie consent met een verplichte opt-in aanvaarden, en zal deze opt-in als cookie bewaard worden', async () => {
        await vlCookieConsentPage.openConsentMetExtraDefaultVerplicht();
        const consentModal = await vlCookieConsentPage.getExtraOptInMandatoryConsent();
        await consentModal.bewaarKeuze();
        await assert.isTrue((await cookies.getCookieConsentOptedInSocialCookie()).value);
        await assert.isTrue((await cookies.getCookieConsentOptedInFunctionalCookie()).value);
    });

    it('als gebruiker kan ik dynamisch een sociale media opt-in toevoegen', async () => {
        await vlCookieConsentPage.openConsentDynamic();
        const preConsentModal = await vlCookieConsentPage.getDynamicConsent();
        const pre = await preConsentModal.getOptIns();

        await preConsentModal.bewaarKeuze();
        await vlCookieConsentPage.voegSocialeMediaOptInToe();
        await vlCookieConsentPage.openConsentDynamic();
        const postConsentModal = await vlCookieConsentPage.getDynamicConsent();
        const post = await postConsentModal.getOptIns();

        assert.isAbove(post.length, pre.length);
        await postConsentModal.bewaarKeuze();
    });

    it('als gebruiker kan ik een opt-in intrekken en zullen de debestreffende cookies geupdate worden', async () => {
        await vlCookieConsentPage.openConsentMetExtraOptIn();
        let consentModal = await vlCookieConsentPage.getExtraOptInConsent();

        let optIn = await consentModal.getOptIn('Sociale media');
        await optIn.optIn();
        await consentModal.bewaarKeuze();
        assert.isTrue((await cookies.getCookieConsentOptedInSocialCookie()).value);
        
        await vlCookieConsentPage.openConsentMetExtraOptIn();
        consentModal = await vlCookieConsentPage.getExtraOptInConsent();
        optIn = await consentModal.getOptIn('Sociale media');
        await optIn.optOut();
        await consentModal.bewaarKeuze();
        assert.isFalse((await cookies.getCookieConsentOptedInSocialCookie()).value);
    });

});
