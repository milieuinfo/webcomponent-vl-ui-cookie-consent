import { VlElement, define } from '/node_modules/vl-ui-core/vl-core.js';
import { VlButton } from '/node_modules/vl-ui-button/vl-button.js';
import { VlCheckbox } from '/node_modules/vl-ui-checkbox/vl-checkbox.js';
import { VlFormLabel, VlFormValidationMessage, VlFormAnnotation } from '/node_modules/vl-ui-form-message/vl-form-message.js';
import { VlFormGrid } from '/node_modules/vl-ui-form-grid/vl-form-grid.js';
import { VlModal } from '/node_modules/vl-ui-modal/vl-modal.js';

customElements.whenDefined('vl-modal').then(() => {
    define('vl-cookie-consent', VlCookieConsent);
});

/**
 * VlCookieConsent
 * @class
 * @classdesc De cookie consent kan gebruikt worden om de gebruiker te informeren over de cookies die gebruikt worden.
 * 
 * @extends VlElement
 * 
 * @property {boolean} data-vl-open - Attribuut wordt gebruikt om de cookie consent modal onmiddellijk gautomatiseerd te openen.
 * @property {boolean} data-vl-opt-in-functional - Attribuut wordt gebruikt om de niet wijzigbare functionele opt-in optie te activeren.
 * @property {boolean} data-vl-analytics - Attribuut wordt gebruikt om het verwerken van gebruikersstatistieken te activeren.
 * @property {boolean} data-vl-opt-in-* - Attribuut zal een opt-in `*` activeren.
 * @property {boolean} data-vl-opt-in-*-label - Attribuut bepaalt het label van de opt-in `*`.
 * @property {boolean} data-vl-opt-in-*-description - Attribuut bepaalt de beschrijving van de opt-in `*`.
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

    static get _optInAttributePrefix() {
        return VlCookieConsent._attributePrefix + "opt-in-";
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
        this._matomoScriptId = 'vl-cookie-consent-matomo-script';
        this._matomoPiwikScriptId = 'vl-cookie-consent-matomo-piwik-script';
        this._matomoOntwikkelUrl = '//stats-ontwikkel.milieuinfo.be/';
        this._matomoOefenUrl = '//stats-oefen.milieuinfo.be/';
        this._matomoProdUrl = '//stats.milieuinfo.be/';
    }

    connectedCallback() {
        if (!this._isFunctionalOptInDisabled) {
            this._addFunctionalOptIn();
        }
        this._processOptIns();
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
     * @param {boolean} optIn.required - Indien de opt-in verplicht is, zal de opt-in standaard geactiveerd worden en kan deze niet gewijzigd worden door de gebruiker.
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

    get _matomoId() {
        let match = {
            'stats-ontwikkel.milieuinfo.be': {
                'id': 1,
                'url': this._matomoOntwikkelUrl
            },
            'ontwikkel.milieuinfo.be': {
                'id': 2,
                'url': this._matomoOntwikkelUrl
            },
            'ontwikkel.omgevingsloket.be': {
                'id': 3,
                'url': this._matomoOntwikkelUrl
            },
            'bredero-ontwikkel.ruimteinfo.be': {
                'id': 5,
                'url': this._matomoOntwikkelUrl
            },
            'bredero-bupo-ontwikkel.ruimteinfo.be': {
                'id': 6,
                'url': this._matomoOntwikkelUrl
            },
            'bredero-xfr-ontwikkel.ruimteinfo.be': {
                'id': 7,
                'url': this._matomoOntwikkelUrl
            },
            'ontwikkel.ruimtemonitor.be': {
                'id': 8,
                'url': this._matomoOntwikkelUrl
            },
            'rupadviestoets-ontwikkel.milieuinfo.be': {
                'id': 9,
                'url': this._matomoOntwikkelUrl
            },
            'zendantennes-ontwikkel.milieuinfo.be': {
                'id': 13,
                'url': this._matomoOntwikkelUrl
            },
            'vsm-ontwikkel.milieuinfo.be': {
                'id': 16,
                'url': this._matomoOntwikkelUrl
            },
            'mobiscore-ontwikkel.omgeving.vlaanderen.be': {
                'id': 22,
                'url': this._matomoOntwikkelUrl
            },
            'erkenningencontactgegevens-ontwikkel.omgeving.vlaanderen.be': {
                'id': 24,
                'url': this._matomoOntwikkelUrl
            }
        }[window.location.host];

        if (!match) {
            match = {
                'stats-oefen.milieuinfo.be': {
                    'id': 1,
                    'url': this._matomoOefenUrl
                },
                'oefen.ruimtemonitor.be': {
                    'id': 2,
                    'url': this._matomoOefenUrl
                },
                'oefen.omgevingsloket.be': {
                    'id': 4,
                    'url': this._matomoOefenUrl
                },
                'vsm-oefen.milieuinfo.be': {
                    'id': 8,
                    'url': this._matomoOefenUrl
                },
                'rupadviestoets-oefen.milieuinfo.be': {
                    'id': 9,
                    'url': this._matomoOefenUrl
                },
                'zendantennes-oefen.milieuinfo.be': {
                    'id': 10,
                    'url': this._matomoOefenUrl
                },
                'www2-oefen.omgeving.vlaanderen.be': {
                    'id': 12,
                    'url': this._matomoOefenUrl
                },
                'mobiscore-oefen.omgeving.vlaanderen.be': {
                    'id': 14,
                    'url': this._matomoOefenUrl
                },
                'erkenningencontactgegevens-oefen.omgeving.vlaanderen.be': {
                    'id': 16,
                    'url': this._matomoOefenUrl
                }
            }[window.location.host];
        }

        if (!match) {
            match = {
                'vsm.milieuinfo.be': {
                    'id': 9,
                    'url': this._matomoProdUrl
                },
                'rupadviestoets.milieuinfo.be': {
                    'id': 11,
                    'url': this._matomoProdUrl
                },
                'zendantennes.milieuinfo.be': {
                    'id': 12,
                    'url': this._matomoProdUrl
                },
                'www.omgevingsloket.be': {
                    'id': 14,
                    'url': this._matomoProdUrl
                },
                'www2.omgeving.vlaanderen.be': {
                    'id': 27,
                    'url': this._matomoProdUrl
                },
                'mobiscore.omgeving.vlaanderen.be': {
                    'id': 29,
                    'url': this._matomoProdUrl
                },
                'ruimtelijkeordening.be': {
                    'id': 30,
                    'url': this._matomoProdUrl
                },
                'complexeprojecten.be': {
                    'id': 31,
                    'url': this._matomoProdUrl
                },
                'rsv.ruimtevlaanderen.be': {
                    'id': 32,
                    'url': this._matomoProdUrl
                },
                'ena.ruimtevlaanderen.be': {
                    'id': 33,
                    'url': this._matomoProdUrl
                },
                'erkenningencontactgegevens.omgeving.vlaanderen.be': {
                    'id': 44,
                    'url': this._matomoProdUrl
                }
            }[window.location.host];
        }

        if (!match) {
            console.warn('de website is nog niet gekend bij ons dus er zullen geen gebruikersstatistieken bijgehouden worden');
        }
        return match;
    }

    get _modalElement() {
        return this._element;
    }

    get _formGridElement() {
        return this._element.querySelector("[is='vl-form-grid']");
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

    _getOptInsTemplate(optIn) {
        if (optIn) {
            const checked = (optIn.value || optIn.required) ? 'checked' : '';
            const disabled = optIn.required ? 'disabled' : '';
            const checkbox = `<vl-checkbox label="${optIn.label}" ${checked} ${disabled}></vl-checkbox>`;
            const template = this._template(`
                <div is="vl-form-column">
                    ${checkbox}
                    <p is="vl-form-annotation" block>${optIn.description}</p>
                </div>
            `);
            template.querySelector('vl-checkbox').addEventListener('input', (event) => {
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
        optIn.value = this._getOptInCheckedAttribute(optIn.name);
    }

    _getOptInAttribute(name, attribute) {
        return this.getAttribute(VlCookieConsent._optInAttributePrefix + name + '-' + attribute);
    }

    _getOptInLabelAttribute(name) {
        return this._getOptInAttribute(name, 'label') || name;
    }

    _getOptInDescriptionAttribute(name) {
        return this._getOptInAttribute(name, 'description');
    }

    _getOptInCheckedAttribute(name) {
        return this._getOptInAttribute(name, 'checked') != undefined;
    }

    _getOptInRequiredAttribute(name) {
        return this._getOptInAttribute(name, 'required') != undefined;
    }

    _processOptIns() {
        [... this.attributes].forEach((attribute) => {
            const matches = /^data-vl-opt-in-([^-]+)(-(.+))?$/.exec(attribute.name);
            if (matches) {
                const name = matches[1];
                this._processOptIn({
                    name: name,
                    label: this._getOptInLabelAttribute(name),
                    description: this._getOptInDescriptionAttribute(name),
                    value: this._getOptInCheckedAttribute(name),
                    required: this._getOptInRequiredAttribute(name)
                });
            }
        });
        this._element.appendChild(this._getButtonTemplate());
    }

    _processOptIn({ name, label, description, value, required, callback: { activated, deactivated } = {} }) {
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
                'required': !!required
            };
            const optInTemplate = this._getOptInsTemplate(optIn);
            if (optInTemplate) {
                this._formGridElement.appendChild(optInTemplate);
            }
        }
    }

    _submitOptIns() {
        Object.values(this._optIns).forEach((optIn) => {
            if (optIn.callback) {
                if (optIn.value || optIn.required) {
                    if (optIn.callback.activated) {
                        optIn.callback.activated();
                    }
                } else {
                    if (optIn.callback.deactivated) {
                        optIn.callback.deactivated();
                    }
                }
            }
            this._setCookie(optIn.name, optIn.value || false);
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
            value: false,
            required: true
        });
    }

    _addAnalytics() {
        if (!document.getElementById(this._matomoScriptId)) {
            document.head.appendChild(this._createMatomoScript());
        }
    }

    _createMatomoScript() {
        const matomo = this._matomoId;
        const element = document.createElement('script');
        element.setAttribute('id', this._matomoScriptId);
        if (matomo) {
            const script = document.createTextNode("" +
                "if (!window._paq) {" +
                "var _paq = window._paq || [];" +
                "_paq.push(['trackPageView']);" +
                "_paq.push(['enableLinkTracking']);" +
                "(function() {" +
                "var u='" + matomo.url + "';" +
                "_paq.push(['setTrackerUrl', u+'piwik.php']);" +
                "_paq.push(['setSiteId', " + matomo.id + "]);" +
                "var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];" +
                "g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; g.id='" + this._matomoPiwikScriptId + "'; s.parentNode.insertBefore(g,s);" +
                "})();" +
                "" +
                "var currentUrl = window.location.href;" +
                "window.addEventListener('hashchange', function() {" +
                "_paq.push(['setReferrerUrl', currentUrl]);" +
                "currentUrl = '' + window.location.hash.substr(1);" +
                "_paq.push(['setCustomUrl', currentUrl]);" +
                "_paq.push(['setDocumentTitle', document.title]);" +
                "_paq.push(['deleteCustomVariables', 'page']);" +
                "_paq.push(['setGenerationTimeMs', 0]);" +
                "_paq.push(['trackPageView']);" +
                "var content = document.getElementById('content');" +
                "_paq.push(['MediaAnalytics::scanForMedia', content]);" +
                "_paq.push(['FormAnalytics::scanForForms', content]);" +
                "_paq.push(['trackContentImpressionsWithinNode', content]);" +
                "_paq.push(['enableLinkTracking']);" +
                "});" +
                "}"
            );
            element.appendChild(script);
        }
        return element;
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