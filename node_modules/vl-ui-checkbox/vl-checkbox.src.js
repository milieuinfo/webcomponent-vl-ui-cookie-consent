import { VlElement, define } from 'vl-ui-core';

/**
 * VlCheckbox
 * @class
 * @classdesc De checkbox laat de gebruiker toe om een of meerdere opties te selecteren uit een lijst. Gebruik de checkbox in formulieren.
 * 
 * @extends VlElement
 * 
 * @property {boolean} block - Attribuut wordt gebruikt om ervoor te zorgen dat de checkbox getoond wordt als een block element en bijgevol de breedte van de parent zal aannemen.
 * @property {boolean} error - Attribuut wordt gebruikt om aan te duiden dat de checkbox verplicht is.
 * @property {boolean} disabled - Attribuut wordt gebruikt om te voorkomen dat de gebruiker de checkbox kan selecteren.
 * @property {boolean} single - Attribuut wordt gebruikt om alleen een checkbox te tonen zonder label.
 * @property {boolean} switch - Attribuut wordt gebruikt om een checkbox variant te genereren met de stijl van een switch.
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-checkbox/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-checkbox/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-checkbox.html|Demo}
 */
export class VlCheckbox extends VlElement(HTMLElement) {
    static get _observedAttributes() {
        return ['label', 'value', 'checked'];
    }

    static get _observedChildClassAttributes() {
        return ['block', 'single', 'disabled', 'error', 'switch'];
    }

    constructor() {
        super(`
            <style>
                @import '../style.css';
            </style>

            <label id="label" class="vl-checkbox" for="checkbox">
                <input class="vl-checkbox__toggle" type="checkbox" id="checkbox" name="checkbox"/>
                <div class="vl-checkbox__label">
                    <i class="vl-checkbox__box" aria-hidden="true"></i>
                </div>
            </label>
        `);
    }

    connectedCallback() {
        this._inputElement.onchange = this._toggle;
        this._inputElement.oninput = event => event.stopPropagation();
    }

    get _classPrefix() {
        return 'vl-checkbox--';
    }

    get _inputElement() {
        return this._element.querySelector('input');
    }

    get _checkboxLabelElement() {
        return this._element.querySelector('.vl-checkbox__label');
    }

    /**
     * Triggert een toggle van de checkbox zonder te klikken op de checkbox.
     * 
     * @Return {void}
     */
    toggle() {
        this._inputElement.click();
    }

    /**
     * Geeft de waarde van de checkbox terug.
     * 
     * @Return {boolean}
     */
    get checked() {
        return this._inputElement.checked;
    }

    _toggle() {
        let checked;
        const parent = this.getRootNode().host;
        if (parent._checked && Array.isArray(parent._checked)) {
            const value = JSON.parse(this.value);
            if (parent._checked.indexOf(value) > -1) {
                parent._checked.splice(parent._checked.indexOf(value), 1);
            } else {
                parent._checked.push(value);
            }
            checked = parent._checked;
            parent.setAttribute('checked', JSON.stringify(checked));
        } else {
            checked = this.checked;
        }
        parent.dispatchEvent(new CustomEvent('input', { detail: this.checked, bubbles: true, composed: true }));
    }

    _labelChangedCallback(oldValue, newValue) {
        this._label = newValue;
        this._checkboxLabelElement.append(this._label);
    }

    _valueChangedCallback(oldValue, newValue) {
        this._inputElement.value = newValue;
    }

    _checkedChangedCallback(oldValue, newValue) {
        try {
            this._checked = JSON.parse(newValue);
        } catch (error) {
            this._checked = newValue != undefined;
        }

        if (!Array.isArray(this._checked)) {
            this._inputElement.checked = this._checked;
        } else if (this._checked.indexOf(JSON.parse(this._inputElement.value)) > -1) {
            this._inputElement.checked = true;
        }
    }

    _disabledChangedCallback(oldValue, newValue) {
        this._inputElement.disabled = newValue != undefined;
    }

    _singleChangedCallback() {
        [... this._checkboxLabelElement.childNodes].filter(this._isTextNode).forEach(this._removeNode);
        const span = document.createElement('span');
        span.classList.add('vl-u-visually-hidden');
        span.textContent = this._label;
        this._checkboxLabelElement.appendChild(span);
    }

    _isTextNode(node) {
        return node.nodeType === 3;
    }

    _removeNode(node) {
        node.remove();
    }
}

define('vl-checkbox', VlCheckbox);

