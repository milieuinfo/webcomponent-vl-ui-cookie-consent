const { VlElement } = require('vl-ui-core').Test;
const { VlCheckbox } = require('vl-ui-checkbox').Test;
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
        if (!(await (this.isOptedIn()))) {
            (await this._getCheckbox()).click();
        }
    }

    async optOut() {
        if (await this.isOptedIn()) {
            (await this._getCheckbox()).click();
        }
    }
}

module.exports = VlCookieConsentOptIn;
