import { NativeVlElement, define } from '/node_modules/vl-ui-core/vl-core.js';

/**
 * VlFormLabel
 * @class
 * @classdesc Gebruik de vl-form-label om labels toe te voegen aan een formulier.
 * 
 * @extends NativeVlElement
 * 
 * @property {boolean} light - Attribuut wordt gebruikt om het label in een lichte kleur te tonen.
 * @property {boolean} block - Attribuut wordt gebruikt om het label in block vorm te tonen zodat het de breedte van het parent element aanneemt.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-form-message/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-form-message/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-form-message.html|Demo}
 */
export class VlFormLabel extends NativeVlElement(HTMLLabelElement) {

  static get _observedClassAttributes() {
    return ['light', 'block'];
  }

  connectedCallback() {
    this.classList.add('vl-form__label');
  }

  get _classPrefix() {
    return 'vl-form__label--';
  }
  
  get _stylePath() {
    return '../style.css';
  }
}


/**
 * VlFormValidationMessage
 * @class
 * @classdesc Gebruik de vl-form-validation-message om een validatie boodschap toe te voegen aan een formulier.
 *
 * @extends NativeVlElement
 *
 * @property {boolean} error - Attribuut wordt gebruikt om foutboodschap te tonen bij validatiefouten.
 * @property {boolean} success - Attribuut wordt gebruikt om boodschap te tonen bij een succesvolle validatie.
 * @property {boolean} block - Attribuut wordt gebruikt om het label in block vorm te tonen zodat het de breedte van het parent element aanneemt.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-form-message/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-form-message/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-form-message.html|Demo}
 */
export class VlFormValidationMessage extends NativeVlElement(HTMLParagraphElement) {
  static get _observedAttributes() {
    return ['block', 'success'];
  }

  static get _observedClassAttributes() {
    return ['error', 'success'];
  }

  get success() {
    return this.getAttribute('success') != undefined;
  }

  get error() {
    return this.getAttribute('error') != undefined;
  }

  get _validationType() {
    return this.success ? 'success' : 'error';
  }

  get _checkElement() {
    return this._element.querySelector('.vl-vi-check');
  }

  _getCheckTemplate() {
    return this._template('<span class="vl-vi vl-vi-check" aria-hidden="true"></span>');
  }

  get _classPrefix() {
    return `vl-form__`;
  }

  get _stylePath() {
    return '../style.css';
  }

  _successChangedCallback(oldValue, newValue) {
    if (newValue != undefined) {
      this._element.append(this._getCheckTemplate());
    } else if (this._checkElement) {
      this._checkElement.remove();
    }
  }

  _blockChangedCallback(oldValue, newValue) {
    this._toggleClass(this, newValue, this._classPrefix + this._validationType + '--block');
  }
}


/**
 * VlFormAnnotation
 * @class
 * @classdesc Gebruik de vl-form-annotation om invoerinstructies toe te voegen aan een formulier.
 *
 * @extends NativeVlElement
 *
 * @property {boolean} block - Attribuut wordt gebruikt om het label in block vorm te tonen zodat het de breedte van het parent element aanneemt.
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-form-message/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-form-message/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-form-message.html|Demo}
 */
export class VlFormAnnotation extends NativeVlElement(HTMLParagraphElement) {

  static get _observedClassAttributes() {
    return ['block'];
  }

  connectedCallback() {
    this.classList.add('vl-form__annotation');
  }

  get _classPrefix() {
    return 'vl-form__annotation--';
  }

  get _stylePath() {
    return '../style.css';
  }
}

define('vl-form-label', VlFormLabel, {extends: 'label'});
define('vl-form-validation-message', VlFormValidationMessage, {extends: 'p'});
define('vl-form-annotation', VlFormAnnotation, {extends: 'p'});
