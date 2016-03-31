// test CSVObject
var CSV = require('../index.js');
var assert = require('assert');

describe('CSVObject', function () {
  var file_test1 = __dirname + "/test1.csv";
  var file_test_sjis = __dirname + "/test-sjis.csv";
  var file_tmp = __dirname + '/tmp.csv';

  it('simple', function () {
    //
    var csv = new CSV.CSVObject();
    csv.readFileSync(file_test1);

    assert.equal(csv.getCell(0, 0), 'aaa');
    assert.equal(csv.getCell(0, 1), 'bbb');
    assert.equal(csv.getCell(0, 2), 'ccc');
    assert.equal(csv.getCell(1, 0), 'ddd');
    assert.equal(csv.getCell(1, 1), 'eee');

    assert.equal(csv.length, 3);
  });

  it('set/get', function () {
    var csv = new CSV.CSVObject();
    csv.setCell(3,0, 'hoge');
    csv.setCell(3,1, 33);
    csv.setCell(2,0, 'fuga');
    csv.setCell(2,1, 22);
    csv.setCell(1,0, 'misia');
    csv.setCell(1,1, 11);
    csv.setCell(0,0, 'singer');
    csv.setCell(0,1, 'price');
    //
    assert.equal(csv.getCell(1,0), 'misia');
    assert.equal(csv.getCell(3,0), 'hoge');
    assert.equal(csv.length, 4);
  });

  it('file read', function () {
    var csv = new CSV.CSVObject();
    // readFile
    csv.readFileSync(file_test_sjis, 'sjis');
    assert.equal(csv.getCell(1, 0), 'A001');
    assert.equal(csv.getCell(1, 1), '石けん');
    //
    csv.readFile(file_test_sjis, 'sjis', function (err, a) {
      assert.equal(csv.getCell(1, 0), 'A001');
      assert.equal(csv.getCell(1, 1), '石けん');
    });
  });
  it('file write1', function () {
    var csv_w = new CSV.CSVObject();
    csv_w.setCell(0,0, "name");
    csv_w.setCell(0,1, "age");
    csv_w.setCell(1,0, "Mick");
    csv_w.setCell(1,1, 30);
    csv_w.writeFileSync(file_tmp);
    var csv_r = new CSV.CSVObject();
    csv_r.readFileSync(file_tmp);
    assert.equal(csv_r.getCell(1,0), 'Mick');
    assert.equal(csv_r.getCell(1,1), 30);
  });
  it('file write2', function () {
    var csv_w = new CSV.CSVObject();
    csv_w.setArray([
      ['name', 'age'],
      ['Daniel,K', 30],
      ['タダシ,AA', 22],
      ['タケシ', 50]
      ['David', 22],
      ['Timothy', 42]
    ]);
    csv_w.writeFileSync(file_tmp, "sjis");
    var csv_r = new CSV.CSVObject();
    csv_r.readFileSync(file_tmp, 'sjis');
    assert.equal(csv_r.getCell(2,0), 'タダシ,AA');
    assert.equal(csv_r.getCell(2,1), 22);
  });
  //
  it('filter', function () {
    var csv = new CSV.CSVObject();
    csv.setArray([
      ['name', 'age'],
      ['Daniel', 30],
      ['Joseph', 25],
      ['David', 22],
      ['John', 15],
    ]);
    // pickup age <= 22
    var n = csv.filter(1, function(v) { return (v <= 22); });
    assert.equal(n.length, 2);
    var m = csv.filter(0, function(v) { return v == 'Daniel'; });
    assert.equal(m[0][0], 'Daniel');
    assert.equal(m[0][1], 30);
  });
  it('findAll', function () {
    var csv = new CSV.CSVObject();
    csv.setArray([
      ['name', 'size'],
      ['Nami', 'M'],
      ['Sanji', 'L'],
      ['Zoro', 'L']
    ]);
    var res = csv.findAll(1, 'L');
    assert.equal(res.length, 2);
    assert.equal(res[0][0], 'Sanji');
    assert.equal(res[1][0], 'Zoro');
  });
});



