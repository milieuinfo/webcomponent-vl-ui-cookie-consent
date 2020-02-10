import {NativeVlElement, define} from "/node_modules/vl-ui-core/vl-core.js";

/**
 * VlRegion
 * @class
 * @classdesc
 * Het region element (vl-region) wordt gebruikt om secties te definiëren op je website.
 * Het zorgt ervoor dat er consistente spacing is tussen verschillende secties beschikbaar op een pagina.
 * Als een voorbeeld: een pagina die de modules "intro", "portfolio", "nieuws" en "contact" bevat,
 * zal in vier verschillende regions worden gewrapped.
 * @extends VlElement
 * @property {boolean} alt - Maakt de achtergrond lichtgrijs.
 * @property {boolean} no-space - Gebruik geen marges.
 * @property {boolean} no-space-bottom - Gebruik geen marges onderaan.
 * @property {boolean} no-space-top - Gebruik geen marges bovenaan.
 * @property {boolean} small - Gebruik kleinere marges.
 * @property {boolean} medium - Gebruik middelgrote marges.
 * @property {boolean} bordered - Teken een rand.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-grid/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-grid/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-grid.html|Demo}
 */
export class VlRegion extends NativeVlElement(HTMLElement) {

  static get _observedClassAttributes() {
    return ['no-space', 'no-space-bottom', 'no-space-top', 'alt', 'small', 'medium', 'bordered'];
  }

  connectedCallback() {
    this.classList.add('vl-region');
  }

  get _classPrefix() {
    return 'vl-region--';
  }

  get _stylePath() {
    return '/node_modules/vl-ui-grid/style.css';
  }
}

/**
 * VlLayout
 * @class
 * @classdesc
 * Het layout element (vl-layout) centreert uw inhoud in de viewport.
 * Het layout element heeft een breedte van 1200px.
 * Je kan het layout element vergelijken met het Container element in Bootstrap.
 * @extends VlElement
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-grid/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-grid/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-grid.html|Demo}
 */
export class VlLayout extends NativeVlElement(HTMLDivElement) {
  static get _observedClassAttributes() {
    return [];
  }

  connectedCallback() {
    this.classList.add('vl-layout');
  }

  get _classPrefix() {
    return 'vl-layout--';
  }

  get _stylePath() {
    return '/node_modules/vl-ui-grid/style.css';
  }
}

/**
 * VlGrid
 * @class
 * @classdesc
 * De grid(.vl-grid) dient om de lay-out van jouw pagina in orde te brengen.
 * Je kan vl-grid vergelijken met de Row element in Bootstrap.
 * @extends VlElement
 * @property {boolean} is-stacked - Voeg marge toe tussen gestapelde kolommen.
 * @property {boolean} align-start - Aligneer een of meerdere kolommen links.
 * @property {boolean} align-center - Centreer een of meerdere kolommen horizontaal.
 * @property {boolean} align-end - Aligneer een of meerdere kolommen rechts.
 * @property {boolean} align-space-between - Laat zoveel mogelijke ruimte tussen kolommen.
 * @property {boolean} align-space-around - Laat zoveel mogelijke ruimte rond kolommen..
 * @property {boolean} v-top - Aligneer een of meerdere kolommen bovenaan.
 * @property {boolean} v-center - Centreer een of meerdere kolommen verticaal.
 * @property {boolean} v-bottom - Aligneer een of meerdere kolommen onderaan.
 * @property {boolean} v-stretch - Rek de kolommen tot aan hun maximum hoogte.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-grid/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-grid/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-grid.html|Demo}
 */
export class VlGrid extends NativeVlElement(HTMLDivElement) {
  static get _observedClassAttributes() {
    return [
      'is-stacked',
      'align-start', 'align-center', 'align-end',
      'align-space-between', 'align-space-around',
      'v-top', 'v-center', 'v-bottom', 'v-stretch'
    ];
  }

  connectedCallback() {
    this.classList.add('vl-grid');
  }

  get _classPrefix() {
    return 'vl-grid--';
  }

  get _stylePath() {
      return '/node_modules/vl-ui-grid/style.css';
  }
}

/**
 * VlColumn
 * @class
 * @classdesc
 * De parent van een VlColumn is altijd een VlGrid.
 * @extends VlElement
 * @property {number} size - De teller van de verdeling van grote scherm.
 * @property {number} max-size - De noemer van de verdeling van grote scherm.
 * @property {number} small-size - De teller van de verdeling van kleine scherm.
 * @property {number} small-max-size - De noemer van de verdeling van kleine scherm.
 * @property {number} extra-small-size - De teller van de verdeling van extra kleine scherm.
 * @property {number} extra-small-max-size - De noemer van de verdeling van extra kleine scherm.
 * @property {number} push - aantal partities te verschuiven.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-grid/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-grid/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-grid.html|Demo}
 */
export class VlColumn extends NativeVlElement(HTMLDivElement) {
  static get _observedAttributes() {
    return ['size', 'max-size', 'small-size', 'small-max-size', 'extra-small-size', 'extra-small-max-size', 'push'];
  }

  get _defaultMinSize() {
    return 12;
  }

  get _defaultMaxSize() {
    return 12;
  }

  get _sizeAttribute() {
    return this.getAttribute('size') || this._defaultMinSize;
  }

  get _maxSizeAttribute() {
    return this.getAttribute('max-size') || this._defaultMaxSize;
  }

  get _smallSizeAttribute() {
    return this.getAttribute('small-size') || this._defaultMinSize;
  }

  get _smallMaxSizeAttribute() {
    return this.getAttribute('small-max-size') || this._defaultMaxSize;
  }

  get _extraSmallSizeAttribute() {
    return this.getAttribute('extra-small-size') || this._defaultMinSize;
  }

  get _extraSmallMaxSizeAttribute() {
    return this.getAttribute('extra-small-max-size') || this._defaultMaxSize;
  }

  get _columnClassPrefix() {
    return 'vl-col--';
  }

  get _pushClassPrefix() {
    return 'vl-push--';
  }

  get _stylePath() {
      return '/node_modules/vl-ui-grid/style.css';
  }

  static __sizeClass(minSize, maxSize, responsiveModifier) {
    return `${minSize}-${maxSize}` + (responsiveModifier ? `--${responsiveModifier}` : '')
  }

  __changeColumnClass(oldValue, newValue) {
    this._changeClass(this, oldValue, newValue, this._columnClassPrefix);
  }

  __changePushClass(oldValue, newValue) {
    this._changeClass(this, oldValue, newValue, this._pushClassPrefix);
  }

  _sizeChangedCallback(oldValue, newValue) {
    oldValue = oldValue || this._defaultMinSize;
    this.__changeColumnClass(
        VlColumn.__sizeClass(oldValue, this._maxSizeAttribute),
        VlColumn.__sizeClass(newValue, this._maxSizeAttribute)
    );
  }

  _max_sizeChangedCallback(oldValue, newValue) {
    oldValue = oldValue || this._defaultMaxSize;
    this.__changeColumnClass(
        VlColumn.__sizeClass(this._sizeAttribute, oldValue),
        VlColumn.__sizeClass(this._sizeAttribute, newValue)
    );
  }

  _small_sizeChangedCallback(oldValue, newValue) {
    oldValue = oldValue || this._defaultMinSize;
    this.__changeColumnClass(
        VlColumn.__sizeClass(oldValue, this._smallMaxSizeAttribute, 's'),
        VlColumn.__sizeClass(newValue, this._smallMaxSizeAttribute, 's')
    );
  }

  _small_max_sizeChangedCallback(oldValue, newValue) {
    oldValue = oldValue || this._defaultMaxSize;
    this.__changeColumnClass(
        VlColumn.__sizeClass(this._smallSizeAttribute, oldValue, 's'),
        VlColumn.__sizeClass(this._smallSizeAttribute, newValue, 's')
    );
  }

  _extra_small_sizeChangedCallback(oldValue, newValue) {
    oldValue = oldValue || this._defaultMinSize;
    this.__changeColumnClass(
        VlColumn.__sizeClass(oldValue, this._extraSmallMaxSizeAttribute, 'xs'),
        VlColumn.__sizeClass(newValue, this._extraSmallMaxSizeAttribute, 'xs')
    );
  }

  _extra_small_max_sizeChangedCallback(oldValue, newValue) {
    oldValue = oldValue || this._defaultMaxSize;
    this.__changeColumnClass(
        VlColumn.__sizeClass(this._extraSmallSizeAttribute, oldValue, 'xs'),
        VlColumn.__sizeClass(this._extraSmallSizeAttribute, newValue, 'xs')
    );
  }

  _pushChangedCallback(oldValue, newValue) {
    this.__changePushClass(
        VlColumn.__sizeClass(oldValue, this._maxSizeAttribute),
        VlColumn.__sizeClass(newValue, this._maxSizeAttribute)
    );
  }
}

define('vl-region', VlRegion, {extends: 'section'});
define('vl-layout', VlLayout, {extends: 'div'});
define('vl-grid', VlGrid, {extends: 'div'});
define('vl-column', VlColumn, {extends: 'div'});
