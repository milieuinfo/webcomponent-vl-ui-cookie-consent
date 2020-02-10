import {VlGrid, VlColumn} from "vl-ui-grid";
import {define} from "vl-ui-core";

/**
 * VlFormGrid
 * @class
 * @classdesc Class die een grid layout mogelijk maakt in een formulier.
 * @extends VlGrid
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-form-grid/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-form-grid/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-form-grid.html|Demo}
 */
export class VlFormGrid extends VlGrid {
  connectedCallback() {
    this.classList.add('vl-form-grid');
  }

  get _classPrefix() {
    return 'vl-form-grid--';
  }
}

/**
 * VlFormColumn
 * @class
 * @classdesc Class die een kolom in een formulier grid layout representeert.
 * @extends VlColumn
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-form-grid/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-form-grid/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-form-grid.html|Demo}
 */
export class VlFormColumn extends VlColumn {

  connectedCallback() {
    this.classList.add('vl-form-column');
  }

  get _columnClassPrefix() {
    return 'vl-form-col--';
  }

  get _pushClassPrefix() {
    return 'vl-form-push--';
  }

}

define('vl-form-grid', VlFormGrid, {extends: 'div'});
define('vl-form-column', VlFormColumn, {extends: 'div'});

