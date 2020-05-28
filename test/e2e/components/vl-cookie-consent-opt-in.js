const {VlElement} = require('vl-ui-core').Test;
const {By} = require('vl-ui-core').Test.Setup;
const {VlCheckbox} = require('vl-ui-checkbox').Test;

class VlCookieConsentOptIn extends VlElement {
  async _getCheckbox() {
    const checkboxElement = await this.shadowRoot.findElement(By.css('vl-checkbox'));
    return new VlCheckbox(this.driver, checkboxElement);
  }

  async _getDescriptionElement() {
    return this.shadowRoot.findElement(By.css('#description'));
  }

  async getDescription() {
    const descriptionElement = await this._getDescriptionElement();
    return descriptionElement.getText();
  }

  async getLabel() {
    const checkbox = await this._getCheckbox();
    return checkbox.getLabel();
  }

  async isOptedIn() {
    return (await this._getCheckbox()).isChecked();
  }

  async optIn() {
    if (!(await (this.isOptedIn()))) {
      await this._clickCheckbox();
    }
  }

  async optOut() {
    if (await this.isOptedIn()) {
      const checkbox = await this._getCheckbox();
      await checkbox.click();
    }
  }

  async _clickCheckbox() {
    const checkbox = await this._getCheckbox();
    await checkbox.click();
  }
}

module.exports = VlCookieConsentOptIn;
