var CSV = require('../lib/csv-lite');
var assert = require('assert');

describe('writeFileSync', function () {
  var file_tmp = __dirname + "/tmp.csv";
  // read and write 
  it('simple-utf8', function () {
    var a = [
      ['aaa',300],
      ['bbb',123]
    ];
    // save
    CSV.writeFileSync(file_tmp, a, "utf8");
    // load
    var b = CSV.readFileSync(file_tmp, "utf8");
    // check
    assert.equal(b[0][0], 'aaa');
    assert.equal(b[0][1], 300);
    assert.equal(b[1][0], 'bbb');
    assert.equal(b[1][1], 123);
  });
  // encoding test
  it('save-sjis', function () {
    var a = [
      ['琵琶湖', 5000],
      ['生姜焼き', 1234],
      ['パンダ', 2222]
    ];
    // save
    CSV.writeFileSync(file_tmp, a, "sjis");
    // load
    var b = CSV.readFileSync(file_tmp, 'sjis');
    // check
    assert.equal(b[1][0], '生姜焼き');
    assert.equal(b[1][1], 1234);
    assert.equal(b[2][0], 'パンダ');
    assert.equal(b[2][1], 2222);
  });
  // encoding test2
  it('save-sjis2', function () {
    var a = [
      ['琵琶湖', 5000],
      ['生姜焼き', 1234],
      ['パンダ', 2222]
    ];
    // save
    CSV.writeFileSync(file_tmp, a, "utf-8");
    // load
    var b = CSV.readFileSync(file_tmp, 'utf-8');
    // check
    assert.equal(b[1][0], '生姜焼き');
    assert.equal(b[1][1], 1234);
    assert.equal(b[2][0], 'パンダ');
    assert.equal(b[2][1], 2222);
  });
});

