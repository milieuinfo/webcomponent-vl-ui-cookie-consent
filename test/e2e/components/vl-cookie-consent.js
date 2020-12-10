const {VlElement} = require('vl-ui-core').Test;
const {By} = require('vl-ui-core').Test.Setup;
const {VlModal} = require('vl-ui-modal').Test;
const VlCookieConsentOptIn = require('../components/vl-cookie-consent-opt-in');

class VlCookieConsent extends VlElement {
  async _getModal() {
    return new VlModal(this.driver, this.shadowRoot);
  }

  async isDisplayed() {
    const modal = await this._getModal();
    return modal.isDisplayed();
  }

  async getOwner() {
    const element = await this.shadowRoot.findElement(By.css('[data-vl-owner]'));
    return element.getText();
  }

  async getLink() {
    const element = await this.shadowRoot.findElement(By.css('#link'));
    return element.getText();
  }

  async getOptIn(label) {
    const optIns = await this.getOptIns();
    for (let i = 0; i < optIns.length; i++) {
      const optIn = optIns[i];
      if (await optIn.getLabel() === label) {
        return optIn;
      }
    }
  }

  async getOptIns() {
    const modal = await this._getModal();
    const optIns = await modal.findElements(By.css('vl-cookie-consent-opt-in'));
    return Promise.all(optIns.map((optIn) => new VlCookieConsentOptIn(this.driver, optIn)));
  }

  async save() {
    const modal = await this._getModal();
    const button = await modal._getActionButton();
    await button.scrollIntoView();
    await button.click();
  }
}

module.exports = VlCookieConsent;
