
const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlFormGridPage = require('./pages/vl-form-grid.page');

describe('vl-form-grid', async () => {
    const vlFormGridPage = new VlFormGridPage(driver);

    before(() => {
        return vlFormGridPage.load();
    });

   
    after(() => driver && driver.quit());
});
