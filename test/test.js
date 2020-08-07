const assert = require('assert');
const checkStock = require("../index");


describe('Validation', function () {
  describe('Error Check', function () {
    it('The function must throw an error where the SKU does not exist', function () {
        assert.throws(function() { checkStock("invalidSKU") }, Error, "no SKU found");
    });
  });
});


describe('Validation', function () {
    describe('response Check', function () {
      it('The function must match the following signature: `(sku: string) => Promise<{ sku: string, qty: number }>`', function () {
          let response = checkStock("LTV719449/39/39");
          assert.equal(response.hasOwnProperty("sku") && response.hasOwnProperty("qty"), true);
      });
    });
  });

  describe('Validation', function () {
    describe('stock Amount check', function () {
      it('The Stock for LTV719449/39/39 should match 8510`', function () {
          let response = checkStock("LTV719449/39/39");
          assert.equal(response.qty === 8510, true);
      });
    });
  });