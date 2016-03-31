var CSV = require('../lib/csv-lite');
var assert = require('assert');

describe('readFileSync', function () {
  var file_test1 = __dirname + "/test1.csv";
  var file_test_sjis = __dirname + "/test-sjis.csv";
  
  it('simple', function () {
    var a = CSV.readFileSync(file_test1, "utf-8");
    assert.equal(a[0][0], 'aaa');
    assert.equal(a[0][1], 'bbb');
    assert.equal(a[1][0], 'ddd');
  });
  
  it('sjis file sync', function () {
    var a = CSV.readFileSync(file_test_sjis, "Shift_JIS");
    assert.equal(a[0][0], '商品ID');
    assert.equal(a[0][1], '商品名');
    assert.equal(a[1][0], 'A001');
    assert.equal(a[1][1], '石けん');
    assert.equal(a[2][1], 'ジュース');
  });
  
  it('sjis file async', function () {
    CSV.readFile(file_test_sjis, "Shift_JIS", function (err, a) {
      assert.equal(a[0][0], '商品ID');
      assert.equal(a[0][1], '商品名');
      assert.equal(a[1][0], 'A001');
      assert.equal(a[1][1], '石けん');
      assert.equal(a[2][1], 'ジュース');
    });
  });
  
  it('file length', function () {
    var a = CSV.readFileSync(file_test_sjis, "Shift_JIS");
    assert.equal(a.length, 4);
    assert.equal(a[0].length, 3);
  });
});

