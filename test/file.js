var CSV = require('../lib/csv-lite');
var assert = require('assert');

describe('readFileSync', function () {

  it('simple', function () {
    var a = CSV.readFileSync(__dirname + "/test1.csv", "utf-8");
    assert.equal(a[0][0], 'aaa');
    assert.equal(a[0][1], 'bbb');
    assert.equal(a[1][0], 'ddd');
  });
  it('sjis file', function () {
    var a = CSV.readFileSync(__dirname + "/test-sjis.csv", "utf-8");
    assert.equal(a[0][0], '商品ID');
    assert.equal(a[0][1], '商品名');
    assert.equal(a[1][0], 'A001');
    assert.equal(a[1][1], '石けん');
    assert.equal(a[2][1], 'ジュース');
  });
});

