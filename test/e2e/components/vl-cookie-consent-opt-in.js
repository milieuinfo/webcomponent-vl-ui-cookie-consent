const { VlElement } = require('vl-ui-core');
const { VlCheckbox } = require('vl-ui-checkbox');
const { By } = require('selenium-webdriver');

class VlCookieConsentOptIn extends VlElement {
    async _getCheckbox() {
        const checkboxElement = await this.shadowRoot.findElement(By.css('vl-checkbox'));
        return new VlCheckbox(this.driver, checkboxElement);
    }

    async isOptedIn() {
        return (await this._getCheckbox()).isChecked();
    }

    async optIn() {
        const isChecked = await this.isOptedIn();
        return isChecked ? Promise.resolve() : (await this._getCheckbox()).click();
    }

    async optOut() {
        const isChecked = await this.isOptedIn();
        return isChecked ? (await this._getCheckbox()).click() : Promise.resolve();
    }
}

module.exports = VlCookieConsentOptIn;
