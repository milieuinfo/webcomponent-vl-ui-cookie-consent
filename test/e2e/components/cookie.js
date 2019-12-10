class Cookie {
    constructor(driver) {
        return (async () => {
            this.cookies = await driver.manage().getCookies();
            return this;
        })();
    }

    async _getCookieValue(name) {
        const cookie = await this.cookies.find(cookie => {
            return cookie.name === name;
        });
        return cookie ? JSON.parse(cookie.value) : undefined
    }

    async isOptedInFunctional() {
        return await this._getCookieValue('vl-cookie-consent-functional');
    }

    async isConsentDateSet() {
        return await this._getCookieValue('vl-cookie-consent-cookie-consent-date');
    }

    async isConsent() {
        return await this._getCookieValue('vl-cookie-consent-cookie-consent');
    }

    async isSocialConsent() {
        return await this._getCookieValue('vl-cookie-consent-social');
    }

}

module.exports = Cookie;
