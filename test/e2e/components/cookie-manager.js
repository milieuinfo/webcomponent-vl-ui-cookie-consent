const { Cookies } = require('vl-ui-core').Cookie;

class CookieManager {
    constructor(driver) {
        this.cookies = new Cookies(driver);
    }

    async getCookieConsentCookie() {
        return await this.cookies.get('vl-cookie-consent-cookie-consent');
    }
    
    async getCookieConsentDateCookie() {
        return await this.cookies.get('vl-cookie-consent-cookie-consent-date');
    }
    
    async getCookieConsentOptedInFunctionalCookie() {
        return await this.cookies.get('vl-cookie-consent-functional');
    }
    
    async getCookieConsentOptedInSocialCookie() {
        return await this.cookies.get('vl-cookie-consent-socialmedia');
    }
}

module.exports = CookieManager;
