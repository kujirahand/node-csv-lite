// test
var CSV = require('../lib/csv-lite');
var assert = require('assert');

describe('stringify', function () {
  var txt = CSV.stringify([
    [1,2,3],
    [4,5,6]
  ]);
  it('simple', function () {
    assert.equal(txt, "1,2,3\r\n4,5,6\r\n");
  });
});

describe('parse', function () {
  var a = CSV.parse("a,b,c\nd,e,f\ng,h,i\n");
  it('simple', function () {
    assert.equal(a[0][0], 'a');
    assert.equal(a[0][1], 'b');
    assert.equal(a[1][0], 'd');
    assert.equal(a[2][2], 'i');
  });
  var b = CSV.parse("\"a,a,a\",\"b,b,b\"\na,b");
  it('double quot1', function () {
    assert.equal(b[0][0], 'a,a,a');
    assert.equal(b[0][1], 'b,b,b');
    assert.equal(b[1][1], 'b');
  });
  var c = CSV.parse("\"aa\"\"aa\",\"bb\",\"cc\"");
  it('double quot2', function () {
    assert.equal(c[0][0], 'aa"aa');
    assert.equal(c[0][1], 'bb');
    assert.equal(c[0][2], 'cc');
  });
  var d = CSV.parse("\"aa\"\"aa\",\"bb\",\"cc\"\n\"1\",\"2\",\"3\"");
  it('double quot3', function () {
    assert.equal(d[1][0], '1');
    assert.equal(d[1][1], '2');
    assert.equal(d[1][2], '3');
  });
});



