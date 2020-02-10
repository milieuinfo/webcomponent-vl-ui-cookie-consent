
const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlGridPage = require('./pages/vl-grid.page');

describe('vl-grid', async () => {
    const vlGridPage = new VlGridPage(driver);

    before(() => {
        return vlGridPage.load();
    });
});
