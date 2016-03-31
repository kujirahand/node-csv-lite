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

  it('value in comma', function () {
    var a = [
      ['name', 'age'],
      ['Daniel,K', 30],
    ];
    var csv = CSV.stringify(a);
    assert.equal(csv, "name,age\r\n\"Daniel,K\",30\r\n");
  });
  it('value in CRLF', function () {
    var a = [
      ['name', 'age'],
      ["aaa\r\nbbb", 30],
    ];
    var csv = CSV.stringify(a);
    assert.equal(csv, "name,age\r\n\"aaa\r\nbbb\",30\r\n");
  });
});

describe('parse CSV', function () {
  it('simple csv', function () {
    var a = CSV.parse("a,b,c\nd,e,f\ng,h,i\n");
    assert.equal(a[0][0], 'a');
    assert.equal(a[0][1], 'b');
    assert.equal(a[1][0], 'd');
    assert.equal(a[2][2], 'i');
  });
  it('double quot1', function () {
    var b = CSV.parse("\"a,a,a\",\"b,b,b\"\na,b");
    assert.equal(b[0][0], 'a,a,a');
    assert.equal(b[0][1], 'b,b,b');
    assert.equal(b[1][1], 'b');
  });
  it('double quot2', function () {
    var c = CSV.parse("\"aa\"\"aa\",\"bb\",\"cc\"");
    assert.equal(c[0][0], 'aa"aa');
    assert.equal(c[0][1], 'bb');
    assert.equal(c[0][2], 'cc');
  });
  it('double quot3', function () {
    var d = CSV.parse("\"aa\"\"aa\",\"bb\",\"cc\"\n\"1\",\"2\",\"3\"");
    assert.equal(d[1][0], '1');
    assert.equal(d[1][1], '2');
    assert.equal(d[1][2], '3');
  });
});

describe('parse TSV', function () {
  it('simple tsv', function () {
    CSV.options.delimiter = "\t";
    var a = CSV.parse("aaa\tbbb\tccc\nddd\teee\tfff");
    assert.equal(a[0][0], "aaa");
    assert.equal(a[1][0], "ddd");
    assert.equal(a[1][1], "eee");
  });
  it('tsv with comma', function () {
    var tsv = "a,b,c\td,e,f\ng,h,i\tj,k,l\no\tp\tq";
    var a = CSV.parse(tsv, "\t");
    assert.equal(a[0][0], "a,b,c");
    assert.equal(a[1][0], "g,h,i");
    assert.equal(a[1][1], "j,k,l");
    assert.equal(a[2][2], "q");
  });
});



