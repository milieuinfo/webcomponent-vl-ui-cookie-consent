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

    it('als gebruiker kan ik de auto-open-disabled modal bevestigen en worden de juiste cookies gezet', async () => {
        await vlCookieConsentPage.openConsent();
        const consentModal = await vlCookieConsentPage.getConsent();

        await assert.eventually.isTrue(consentModal.isDisplayed());
        await consentModal.save();
        await assert.eventually.isFalse(consentModal.isDisplayed());

        assert.isTrue((await cookies.getCookieConsentCookie()).value);
        assert.isNotNull((await cookies.getCookieConsentDateCookie()).value);
        assert.isTrue((await cookies.getCookieConsentOptedInFunctionalCookie()).value);
    });

    it('als gebruiker kan ik nogmaals toestemming geven en wordt de consent-date geupdate', async () => {
        await vlCookieConsentPage.openConsent();
        await (await vlCookieConsentPage.getConsent()).save();

        const date1 = (await cookies.getCookieConsentDateCookie()).value;

        await vlCookieConsentPage.openConsent();
        await (await vlCookieConsentPage.getConsent()).save();

        const date2 = (await cookies.getCookieConsentDateCookie()).value;

        assert.isAbove(date2, date1);
    });

    it('als gebruiker kan ik een cookie-consent zonder functionele opt-in aanvaarden en wordt er enkel een consent en geen functional cookie gezet', async () => {
        await vlCookieConsentPage.openNoFunctionalConsent();
        const consentModal = await vlCookieConsentPage.getNoFunctionalConsent();

        await consentModal.save();

        await assert.isTrue((await cookies.getCookieConsentCookie()).value);
        await assert.isNotNull((await cookies.getCookieConsentDateCookie()).value);
        await assert.isUndefined((await cookies.getCookieConsentOptedInFunctionalCookie().value));
    });

    it('als gebruiker kan ik een cookie-consent met sociale media opt-in aanvaarden en zal er voor sociale media een cookie gezet worden', async () => {
        await vlCookieConsentPage.openExtraOptInConsent();
        const consentModal = await vlCookieConsentPage.getExtraOptInConsent();
        const optIn = await consentModal.getOptIn('Sociale media');
        await optIn.optIn();
        await assert.eventually.isTrue(optIn.isOptedIn());
        await consentModal.save();
        await assert.isTrue((await cookies.getCookieConsentOptedInSocialCookie()).value);
    });

    it('als gebruiker kan ik een cookie consent met een default aangevinkte opt-in aanvaarden, en zal deze opt-in als cookie bewaard worden', async () => {
        await vlCookieConsentPage.openExtraOptInDefaultConsent();
        const consentModal = await vlCookieConsentPage.getExtraOptInDefaultConsent();
        await consentModal.save();
        await assert.isTrue((await cookies.getCookieConsentOptedInSocialCookie()).value);
    });

    it('als gebruiker kan ik een cookie consent met een verplichte opt-in aanvaarden, en zal deze opt-in als cookie bewaard worden', async () => {
        await vlCookieConsentPage.openExtraOptInMandatoryConsent();
        const consentModal = await vlCookieConsentPage.getExtraOptInMandatoryConsent();
        await consentModal.save();
        await assert.isTrue((await cookies.getCookieConsentOptedInSocialCookie()).value);
        await assert.isTrue((await cookies.getCookieConsentOptedInFunctionalCookie()).value);
    });

    it('als gebruiker kan ik dynamisch een sociale media opt-in toevoegen', async () => {
        await vlCookieConsentPage.openDynamicConsent();
        const preConsentModal = await vlCookieConsentPage.getDynamicConsent();
        const preOptIns = await preConsentModal.getOptIns();

        await preConsentModal.save();
        await vlCookieConsentPage.voegSocialeMediaOptInToe();
        await vlCookieConsentPage.openDynamicConsent();
        const postConsentModal = await vlCookieConsentPage.getDynamicConsent();
        const postOptIns = await postConsentModal.getOptIns();

        assert.isAbove(postOptIns.length, preOptIns.length);
        await assert.eventually.isDefined(postConsentModal.getOptIn("Sociale media"));
        await postConsentModal.save();
    });

    it('als gebruiker kan ik een opt-in intrekken en zullen de debestreffende cookies geupdate worden', async () => {
        await vlCookieConsentPage.openExtraOptInConsent();
        let consentModal = await vlCookieConsentPage.getExtraOptInConsent();

        let optIn = await consentModal.getOptIn('Sociale media');
        await optIn.optIn();
        await consentModal.save();
        assert.isTrue((await cookies.getCookieConsentOptedInSocialCookie()).value);

        await vlCookieConsentPage.openExtraOptInConsent();
        consentModal = await vlCookieConsentPage.getExtraOptInConsent();
        optIn = await consentModal.getOptIn('Sociale media');
        await optIn.optOut();
        await consentModal.save();
        assert.isFalse((await cookies.getCookieConsentOptedInSocialCookie()).value);
    });

    it('als gebruiker kan ik de gepersonaliseerde eigenaar en link zien', async () => {
        await vlCookieConsentPage.openDynamicTextConsent();
        const consentModal = await vlCookieConsentPage.getDynamicTextConsent();
        await assert.eventually.equal(consentModal.getOwner(), 'UIG');
        await assert.eventually.equal(consentModal.getLink(), 'https://webcomponenten.omgeving.vlaanderen.be');
    });
});
