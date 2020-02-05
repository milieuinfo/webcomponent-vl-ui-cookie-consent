import { VlElement, define } from '/node_modules/vl-ui-core/vl-core.js';
import '/node_modules/vl-ui-button/vl-button.js';
import '/node_modules/vl-ui-checkbox/vl-checkbox.js';
import '/node_modules/vl-ui-form-message/vl-form-message.js';
import '/node_modules/vl-ui-form-grid/vl-form-grid.js';
import '/node_modules/vl-ui-modal/vl-modal.js';
import { analytics } from '/src/analytics.js';

customElements.whenDefined('vl-modal').then(() => {
    define('vl-cookie-consent', VlCookieConsent);
});

/**
 * VlCookieConsentOptIn
 * @class
 * @classdesc De cookie consent opt-in geeft de gebruiker om één specifiek soort van cookies te accepteren of te weigeren.
 * 
 * @extends VlElement
 * 
 * @property {boolean} data-vl-label - Attribuut bepaalt het label van de opt-in.
 * @property {boolean} data-vl-description - Attribuut bepaalt de beschrijving van de opt-in.
 * @property {boolean} data-vl-checked - Attribuut bepaalt of de opt-in standaard aangevinkt staat.
 * @property {boolean} data-vl-mandatory - Attribuut bepaalt of de opt-in verplicht is en bijgevolg aangevinkt staat en niet wijzigbaar is.
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-cookie-consent/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-cookie-consent/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-cookie-consent.html|Demo}
 * 
 */
export class VlCookieConsentOptIn extends VlElement(HTMLElement) {
    static get _observedAttributes() {
        return ['data-vl-label', 'data-vl-description', 'data-vl-checked', 'data-vl-mandatory'];
    }

    constructor() {
        super(`
            <style>
                @import '/node_modules/vl-ui-form-grid/style.css';
                @import '/node_modules/vl-ui-form-message/style.css';
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
            <p id="description" is="vl-form-annotation" block>${description}</p>
        `);
    }

    _data_vl_labelChangedCallback(oldValue, newValue) {
        this._checkboxElement.setAttribute('label', newValue);
    }

    _data_vl_descriptionChangedCallback(oldValue, newValue) {
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

    _data_vl_checkedChangedCallback(oldValue, newValue) {
        if (newValue != undefined) {
            this._checkboxElement.setAttribute('checked', '');
        }
    }

    _data_vl_mandatoryChangedCallback(oldValue, newValue) {
        if (newValue != undefined) {
            this._checkboxElement.setAttribute('checked', '');
            this._checkboxElement.setAttribute('disabled', '');
        }
    }
}

/**
 * VlCookieConsent
 * @class
 * @classdesc De cookie consent kan gebruikt worden om de gebruiker te informeren over al de cookies die gebruikt worden.
 * 
 * @extends VlElement
 * 
 * @property {boolean} data-vl-auto-open-disabled - Attribuut wordt gebruikt om te voorkomen dat de cookie consent modal onmiddellijk gautomatiseerd geopend wordt.
 * @property {boolean} data-vl-auto-opt-in-functional-disabled - Attribuut wordt gebruikt om de niet wijzigbare functionele opt-in optie te deactiveren.
 * @property {boolean} data-vl-analytics - Attribuut wordt gebruikt om het verwerken van gebruikersstatistieken te activeren.
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-cookie-consent/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-cookie-consent/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-cookie-consent.html|Demo}
 * 
 */
export class VlCookieConsent extends VlElement(HTMLElement) {
    static get _observedAttributes() {
        return ['data-vl-analytics'];
    }

    static get _attributePrefix() {
        return 'data-vl-';
    }

    constructor() {
        super(`
            <style>
                @import '/node_modules/vl-ui-button/style.css';
                @import '/node_modules/vl-ui-checkbox/style.css';
                @import '/node_modules/vl-ui-form-message/style.css';
                @import '/node_modules/vl-ui-form-grid/style.css';
                @import '/node_modules/vl-ui-modal/style.css';
            </style>

            <vl-modal data-title="Cookie-toestemming" not-cancellable>
                <div is="vl-form-grid" is-stacked slot="content">
                    <div is="vl-form-column">Het Departement Omgeving maakt op de websites waarvoor zij verantwoordelijk is gebruik van "cookies" en vergelijkbare internettechnieken. Cookies zijn kleine "tekstbestanden" die worden gebruikt om onze websites en apps beter te laten werken en jouw surfervaring te verbeteren. Zij kunnen worden opgeslagen in de context van de webbrowser(s) die je gebruikt bij het bezoeken van onze website(s).</div>
                    <div is="vl-form-column">Er zijn verschillende soorten cookies, en deze hebben ook een verschillende doelstelling en geldigheidsduur. Een beperkt aantal cookies (essenti&#235;le cookies) zijn absoluut noodzakelijk, deze zijn altijd anoniem. Andere cookies dragen bij aan het gebruikscomfort, je hebt de keuze om deze al dan niet te aanvaarden.</div>
                    <div is="vl-form-column">
                        Op <a href="https://www.omgevingvlaanderen.be/privacy" target="_blank">https://www.omgevingvlaanderen.be/privacy</a> vind je meer informatie over de manier waarop het Departement Omgeving omgaat met uw privacy:
                        <ul>
                            <li>ons privacybeleid, vertaald in de Privacyverklaring</li>
                            <li>algemene informatie over de nieuwe Privacywet</li>
                            <li>de contactgegevens van de functionaris voor gegevensbescherming of DPO</li>
                        </ul>
                    </div>
                    <div is="vl-form-column">De cookie-toestemming die je geeft is van toepassing op meerdere websites, subsites en apps van het Departement Omgeving. Welke dit zijn, vind je via de Privacyverklaring. Je kunt naderhand een eerdere toestemming intrekken of wijzigen.</div>
                </div>
            </vl-modal>
        `);
        
        this._optIns = {};
        this._cookieConsentCookieName = 'cookie-consent';
        this._cookieConsentDateCookieName = 'cookie-consent-date';
        this._cookieConsentResetDate = new Date('2019/05/14');

        if (!this._isFunctionalOptInDisabled) {
            this._addFunctionalOptIn();
        }
        this._processOptIns();
        this._element.appendChild(this._getButtonTemplate());
        if (!this._isAutoOpenDisabled) {
            this._open();
        }
    }

    /**
     * Opent de cookie-consent ook al werd deze eerder getoond aan de gebruiker.
     * @returns {void}
     */
    open() {
        this._open(true);
    }

    /**
     * Sluit de cookie-consent.
     * @returns {void}
     */
    close() {
        this._modalElement.close();
        this._setCookie(this._cookieConsentCookieName, true);
        this._setCookie(this._cookieConsentDateCookieName, new Date().getTime());
        this._submitOptIns();
    }

    /**
     * Verwijdert al de cookies en herstelt de opt-in waarden naar de initiële toestand.
     * @returns {void}
     */
    reset() {
        this._deleteCookie(this._cookieConsentCookieName);
        this._deleteCookie(this._cookieConsentDateCookieName);
        Object.values(this._optIns).forEach((optIn) => {
            this._deleteCookie(optIn.name);
            this._resetOptInValue(optIn);
            if (optIn.callback && optIn.callback.deactivated) {
                optIn.callback.deactivated();
            }
        });
    }

    /**
     * Voeg een opt-in toe.
     * @param {object} optIn - De opt-in optie met attributen.
     * @param {string} optIn.name - De naam van de opt-in optie.
     * @param {string} optIn.label - Het label van de opt-in optie die getoond zal worden aan de gebruiker.
     * @param {string} optIn.description - De beschrijving van de opt-in optie die getoond zal worden aan de gebruiker.
     * @param {boolean} optIn.value - De standaard opt-in optie waarde die bepaalt of de opt-in standaard geactiveerd wordt.
     * @param {boolean} optIn.mandatory - Indien de opt-in verplicht is, zal de opt-in standaard geactiveerd worden en kan deze niet gewijzigd worden door de gebruiker.
     * @param {function} optIn.callback - De callback functies.
     * @param {function} optIn.callback.activated - Functie die aangeroepen wordt wanneer de gebruiker de cookie-consent bevestigt en de opt-in geactiveerd werd.
     * @param {function} optIn.callback.deactivated - Functie die aangeroepen wordt wanneer de gebruiker de cookie-consent bevestigt en de opt-in gedactiveerd werd.
     * @returns {void}
     */
    addOptIn(optIn) {
        this._processOptIn(optIn);
    }

    /**
     * Voegt aan een opt-in een callback toe die aangeroepen wordt wanneer de opt-in geactiveerd wordt.
     * @param {string} name - De opt-in optie naam.
     * @param {function} callback - Callback functie.
     */
    addOptInActivatedCallback(name, callback) {
        if (this._optIns[name]) {
            this._optIns[name].callback.activated = callback;
        }
    }

    /**
     * Voegt aan een opt-in een callback toe die aangeroepen wordt wanneer de opt-in gedeactiveerd wordt.
     * @param {string} name - De opt-in optie naam.
     * @param {function} callback - Callback functie.
     */
    addOptInDeactivatedCallback(name, callback) {
        if (this._optIns[name]) {
            this._optIns[name].callback.deactivated = callback;
        }
    }

    /**
     * Bepaalt of een opt-in actief is of niet op basis van de naam.
     * @param {string} name - De opt-in optie naam.
     * @returns {boolean}
     */
    isOptInActive(name) {
        return this._optIns[name] ? this._optIns[name].value : false;
    };

    get _isAutoOpenDisabled() {
        return this.getAttribute(VlCookieConsent._attributePrefix + 'auto-open-disabled') != undefined;
    }

    get _isFunctionalOptInDisabled() {
        return this.getAttribute(VlCookieConsent._attributePrefix + 'auto-opt-in-functional-disabled') != undefined;
    }

    get _cookiePrefix() {
        return 'vl-cookie-consent-';
    }

    get _modalElement() {
        return this._element;
    }

    get _formGridElement() {
        return this._element.querySelector('[is="vl-form-grid"]');
    }

    get _optInElementen() {
        return this.querySelectorAll('vl-cookie-consent-opt-in');
    }

    _getButtonTemplate() {
        const text = Object.values(this._optIns).length > 0 ? 'Bewaar keuze' : 'Ik begrijp het';
        const template = this._template(`
            <button is="vl-button" slot="button">${text}</button>
        `);
        template.querySelector('button').addEventListener('click', () => {
            this.close();
        });
        return template;
    }

    _getOptInTemplate(optIn) {
        if (optIn) {
            const checked = (optIn.value || optIn.mandatory) ? 'data-vl-checked' : '';
            const mandatory = optIn.mandatory ? 'data-vl-mandatory' : '';
            const template = this._template(`
                <div is="vl-form-column">
                    <vl-cookie-consent-opt-in data-vl-label="${optIn.label}" data-vl-description="${optIn.description}" ${checked} ${mandatory}></vl-cookie-consent-opt-in>
                </div>
            `);
            template.querySelector('vl-cookie-consent-opt-in').addEventListener('input', (event) => {
                const checked = event && event.currentTarget ? event.currentTarget.checked : false;
                optIn.value = checked;
            });
            return template;
        }
    }

    _open(forced) {
        if (forced || !this._getCookieConsentCookie() || !this._heeftCookieConsentDateCookie() || !this._isCookieConsentCookieGeldig()) {
            this._modalElement.open();
        }
    }

    _resetOptInValue(optIn) {
        const match = [... this._optInElementen].find((optIn) => {
            return optIn.id = optIn.name;
        });
        if (match) {
            optIn.value = optIn.getAttribute(VlCookieConsent._attributePrefix + 'checked') != undefined;
        }
    }

    _processOptIns() {
        this._optInElementen.forEach((optIn) => {
            this._processOptIn({
                name: optIn.id,
                label: optIn.getAttribute(VlCookieConsent._attributePrefix + 'label'),
                description: optIn.getAttribute(VlCookieConsent._attributePrefix + 'description'),
                value: optIn.getAttribute(VlCookieConsent._attributePrefix + 'checked') != undefined,
                mandatory: optIn.getAttribute(VlCookieConsent._attributePrefix + 'mandatory') != undefined
            });
        });
    }

    _processOptIn({ name, label, description, value, mandatory, callback: { activated, deactivated } = {} }) {
        if (!this._bevatOptIn(name)) {
            const storedValue = this._getCookie(name);
            const optIn = this._optIns[name] = {
                'name': name,
                'label': label,
                'description': description,
                'value': storedValue !== undefined ? storedValue : value,
                'callback': {
                    'activated': activated,
                    'deactivated': deactivated
                },
                'mandatory': !!mandatory
            };
            const optInTemplate = this._getOptInTemplate(optIn);
            if (optInTemplate) {
                this._formGridElement.appendChild(optInTemplate);
            }
        }
    }

    _submitOptIns() {
        Object.values(this._optIns).forEach((optIn) => {
            if (optIn.callback) {
                if (optIn.value || optIn.mandatory) {
                    if (optIn.callback.activated) {
                        optIn.callback.activated();
                    }
                } else {
                    if (optIn.callback.deactivated) {
                        optIn.callback.deactivated();
                    }
                }
            }
            this._setCookie(optIn.name, (optIn.value || optIn.mandatory) || false);
        });
    }

    _bevatOptIn(name) {
        return !!this._optIns[name];
    }

    _addFunctionalOptIn() {
        this._processOptIn({
            name: 'functional',
            label: 'Noodzakelijke cookies toestaan (verplicht)',
            description: 'Noodzakelijke cookies helpen een website bruikbaarder te maken, door basisfuncties als paginanavigatie en toegang tot beveiligde gedeelten van de website mogelijk te maken. Zonder deze cookies kan de website niet naar behoren werken.',
            value: true,
            mandatory: true
        });
    }

    _addAnalytics() {
        if (!document.getElementById(analytics.scriptId)) {
            document.head.appendChild(analytics.script);
        }
    }

    _getCookie(name) {
        name = this._cookiePrefix + name + '=';
        const cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) == 0) {
                try {
                    return JSON.parse(cookie.substring(name.length, cookie.length));
                } catch (error) {
                    return cookie.substring(name.length, cookie.length);
                }
            }
        }
    }

    _getCookieConsentCookie() {
        return this._getCookie(this._cookieConsentCookieName);
    }

    _getCookieConsentDateCookie() {
        return this._getCookie(this._cookieConsentDateCookieName);
    }

    _setCookie(name, value) {
        document.cookie = this._cookiePrefix + name + '=' + value + ';Max-Age=2147483647;path=/;';
    }

    _deleteCookie(name) {
        document.cookie = this._cookiePrefix + name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    }

    _heeftCookieConsentDateCookie() {
        return this._getCookieConsentDateCookie() != undefined;
    }

    _isCookieConsentCookieGeldig() {
        return !isNaN(this._getCookieConsentDateCookie()) && (new Date(this._getCookieConsentDateCookie()) > this._cookieConsentResetDate);
    }

    _data_vl_analyticsChangedCallback(oldValue, newValue) {
        if (newValue != undefined) {
            if (!this._isFunctionalOptInDisabled) {
                this._addAnalytics();
            } else {
                console.error('analytics kunnen alleen toegevoegd worden wanneer de functionele cookies opt-in geactiveerd werd!');
            }
        }
    }
}


define('vl-cookie-consent-opt-in', VlCookieConsentOptIn);
