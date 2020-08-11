import {vlElement, define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/node_modules/vl-ui-checkbox/dist/vl-checkbox.js';
import '/node_modules/vl-ui-form-message/dist/vl-form-message.js';

/**
 * VlCookieConsentOptIn
 * @class
 * @classdesc De cookie consent opt-in geeft de gebruiker om één specifiek soort van cookies te accepteren of te weigeren.
 *
 * @extend HTMLElement
 * @mixes vlElement
 *
 * @property {boolean} data-vl-label - Attribuut bepaalt het label van de opt-in.
 * @property {boolean} data-vl-description - Attribuut bepaalt de beschrijving van de opt-in.
 * @property {boolean} data-vl-checked - Attribuut bepaalt of de opt-in standaard aangevinkt staat.
 * @property {boolean} data-vl-mandatory - Attribuut bepaalt of de opt-in verplicht is en bijgevolg aangevinkt staat en niet wijzigbaar is.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-cookie-consent/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-cookie-consent/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-cookie-consent-opt-in.html|Demo}
 *
 */
export class VlCookieConsentOptIn extends vlElement(HTMLElement) {
  static get _observedAttributes() {
    return ['label', 'description', 'checked', 'mandatory'];
  }

  constructor() {
    super(`
      <style>
          @import '/node_modules/vl-ui-form-message/dist/style.css';
      </style>
      <div>
          <vl-checkbox></vl-checkbox>
      </div>
    `);
  }

  get checked() {
    return this._checkboxElement.checked;
  }

  get _checkboxElement() {
    return this._element.querySelector('vl-checkbox');
  }

  get _descriptionElement() {
    return this._element.querySelector('#description');
  }

  _getDescriptionTemplate(description) {
    return this._template(`
      <p id="description" is="vl-form-annotation" data-vl-block>${description}</p>
    `);
  }

  _labelChangedCallback(oldValue, newValue) {
    this._checkboxElement.setAttribute('data-vl-label', newValue);
  }

  _descriptionChangedCallback(oldValue, newValue) {
    if (newValue) {
      if (this._descriptionElement) {
        this._descriptionElement.textContent = newValue;
      } else {
        this._element.appendChild(this._getDescriptionTemplate(newValue));
      }
    } else {
      this._descriptionElement.remove();
    }
  }

  _checkedChangedCallback(oldValue, newValue) {
    if (newValue != undefined) {
      this._checkboxElement.setAttribute('data-vl-checked', '');
    }
  }

  _mandatoryChangedCallback(oldValue, newValue) {
    if (newValue != undefined) {
      this._checkboxElement.setAttribute('data-vl-checked', '');
      this._checkboxElement.setAttribute('data-vl-disabled', '');
    }
  }
}

define('vl-cookie-consent-opt-in', VlCookieConsentOptIn);
