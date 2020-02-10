const VlCheckbox = require('../components/vl-checkbox');
const { Page, Config } = require('vl-ui-core').Test;

class VlCheckboxPage extends Page {
    async _getCheckbox(selector) {
        return new VlCheckbox(this.driver, selector);
    }

    async getCheckbox1() {
        return await this._getCheckbox('#checkbox-1');
    }

    async getCheckbox2() {
        return await this._getCheckbox('#checkbox-2');
    }

    async getCheckboxBlock() {
        return await this._getCheckbox('#checkbox-block');
    }

    async getCheckboxError() {
        return await this._getCheckbox('#checkbox-error');
    }

    async getCheckboxDisabled() {
        return await this._getCheckbox('#checkbox-disabled')
    }

    async getCheckboxSingle() {
        return await this._getCheckbox('#checkbox-single');
    }

    async getCheckboxSwitch() {
        return await this._getCheckbox('#checkbox-switch');
    }

    async getCheckboxMulti1() {
        return await this._getCheckbox('#checkbox-multi-1')
    }

    async getCheckboxMulti2() {
        return await this._getCheckbox('#checkbox-multi-2');
    }

    async getCheckboxMulti3() {
        return await this._getCheckbox('#checkbox-multi-3');
    }

    async getCheckboxMultiStandard1() {
        return await this._getCheckbox('#checkbox-multi-st-1')
    }    
    
    async getCheckboxMultiStandard2() {
        return await this._getCheckbox('#checkbox-multi-st-2')
    }    
    
    async getCheckboxMultiStandard3() {
        return await this._getCheckbox('#checkbox-multi-st-3')
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-checkbox.html');
    }
}

module.exports = VlCheckboxPage;
