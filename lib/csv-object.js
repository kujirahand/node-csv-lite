// csv-object.js --- for Node.js
'use strict';

var CSV = require(__dirname + '/csv-lite.js');

// constructor
function CSVObject() {
  this.rows = [];
  this.options = CSV.options;
  this.useHeader = false;
}

CSVObject.prototype.toString = function () {
  return CSV.stringify(this.rows);
};
CSVObject.prototype.parse = function (str, delimiter) {
  this.rows = CSV.parse(str, delimiter);
};

// alias
CSVObject.prototype.fromString = CSVObject.prototype.parse;
CSVObject.prototype.stringify = CSVObject.prototype.toString;

// cell method
CSVObject.prototype.getCell = function (row, col) {
  return this.rows[row][col];
};
CSVObject.prototype.setCell = function (row, col, value) {
  // check col and row length
  var colsize = this.getColSize();
  while (this.rows.length <= row) {
    var cols = [];
    for (var i = 0; i < colsize; i++) {
      cols.push('');
    }
    this.rows.push(cols);
  }
  // set value
  this.rows[row][col] = value;
};
CSVObject.prototype.getColSize = function () {
  if (this.rows.length == 0) return 0;
  return this.rows[0].length;
};

CSVObject.prototype.setArray = function (a) {
  this.rows = a;
};
CSVObject.prototype.getArray = function () {
  return this.rows;
};

// find method
CSVObject.prototype.find = function (colNo, keyword, offset) {
  if (offset == undefined) {
    offset = this.useHeader ? 1 : 0;
  }
  for (var i = offset; i < this.rows.length; i++) {
    var row = this.rows[i];
    if (row[colNo] == keyword) return i;
  }
  return -1;
};
CSVObject.prototype.findAll = function (colNo, keyword, offset, limit) {
  var result = [];
  if (offset == undefined) offset = (this.useHeader) ? 1 : 0;
  if (limit == undefined) limit = this.rows.length;
  for (var i = offset; i < this.rows.length; i++) {
    var row = this.rows[i];
    if (row[colNo] == keyword) {
      result.push(row);
      if (limit <= result.length) break;
    }
  }
  return result;
};

// filter method
//   callback = function(value, rowIndex, rowArray) { return true; };
CSVObject.prototype.filter = function (colNo, callback) {
  return this.rows.filter(function(row, rowNo, array) {
    if (row == undefined) return false;
    var value = row[colNo];
    return callback(value, rowNo, array);
  });
};

// sort method
CSVObject.prototype.sort = function (colNo, isAsc) {
  var sort_func;
  if (isAsc == undefined) isAsc = true;
  if (isAsc) {
    sort_func = function (a, b) { return a[colNo] > b[colNo] };
  } else {
    sort_func = function (a, b) { return a[colNo] < b[colNo] };
  }
  if (this.useHeader) {
    var header = this.rows.shift();
    this.rows.sort(sort_func);
    this.rows.unshift(header);
  } else {
    this.rows.sort(sort_func);
  }
};

CSVObject.prototype.sortNumber = function (colNo, isAsc) {
  var sort_func;
  if (isAsc == undefined) isAsc = true;
  if (isAsc) {
    sort_func = function (a, b) { 
      return parseFloat(a[colNo]) > parseFloat(b[colNo]); 
    };
  } else {
    sort_func = function (a, b) {
      return parseFloat(a[colNo]) < parseFloat(b[colNo]);
    };
  }
  if (this.useHeader) {
    var header = this.rows.shift();
    this.rows.sort(sort_func);
    this.rows.unshift(header);
  } else {
    this.rows.sort(sort_func);
  }
};

// insert / delete
CSVObject.prototype.insertRow = function (rowNo, rowArray) {
  this.rows.splice(rowNo, 0, rowArray);
};
CSVObject.prototype.deleteRow = function (rowNo) {
  return this.rows.splice(rowNo, 1);
};
CSVObject.prototype.insertCol = function (colNo, values) {
  this.rows.map(function(row, index, array) {
    row.splice(colNo, 0, values[index]);
    return row;
  });
};
CSVObject.prototype.deleteCol = function (colNo) {
  this.rows.map(function(row, index, array) {
    row.splice(colNo, 1);
    return row;
  });
};

// file method
CSVObject.prototype.readFile = function (filename, encoding, callback) {
  this.rows = CSV.readFile(filename, encoding, callback);
};
CSVObject.prototype.readFileSync = function (filename, encoding) {
  this.rows = CSV.readFileSync(filename, encoding);
};
CSVObject.prototype.writeFile = function (filename, encoding, callback) {
  CSV.writeFile(filename, this.rows, encoding, callback);
};
CSVObject.prototype.writeFileSync = function (filename, encoding) {
  CSV.writeFileSync(filename, this.rows, encoding);
};
Object.defineProperty(CSVObject.prototype, 'length', {
  get: function () {
    if (this.rows == undefined) return 0;
    return this.rows.length;
  }
});

// exports
CSV.CSVObject = CSVObject;
module.exports = CSV;



