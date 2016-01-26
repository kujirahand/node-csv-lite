// csv.js --- for Node.js

var options = {
  delimiter: ',',
  eol: "\r\n"
};

function parse(txt, delimiter) {
  // delimiter
  if (delimiter == undefined) {
    delimiter = options.delimiter;
  }
  // check txt
  txt = "" + txt + "\n";
  txt = txt.split("\r\n").join("\n");
  // set pattern
  var pat = "^(.*?)([\\"+delimiter+"\\n])";
  var re = new RegExp(pat);
  // parse txt
  var res = [], cells = [];
  while (txt != "") {
    // trim top
    txt = txt.replace(/^\s+/, "");
    var c = txt.charAt(0);
    // number or simple string
    if (c !== '"') { // number or simple str
      var m = re.exec(txt);
      if (!m) {
        cells.push(txt);
        res.push(cells);
        cells = [];
        break;
      }
      // console.log(pat,m);
      if (m[2] == "\n") {
        cells.push(m[1]);
        res.push(cells);
        cells = [];
      } else if (m[2] == delimiter) {
        cells.push(m[1]);
      }
      txt = txt.substr(m[0].length);
      continue;
    }
    if (c == delimiter) {
      cells.push('');
      continue;
    }
    // "" ... blank data
    if (txt.substr(0, 2) == '""') {
      cells.push('');
      txt = txt.substr(2);
      continue;
    }
    // "..."
    var i = 1, s = "";
    while (i < txt.length) {
      var c1 = txt.charAt(i);
      var c2 = txt.charAt(i + 1);
      // console.log("@" + c1 + c2);
      // 2quote => 1quote char
      if (c1 == '"' && c2 == '"') {
        i += 2;
        s += '"';
        continue;
      }
      if (c1 == '"') {
        i++;
        if (c2 == delimiter) {
          i++;
          cells.push(s);
          s = '';
          break;
        }
        if (c2 == "\n") {
          i++;
          cells.push(s);
          res.push(cells);
          cells = [];
          break;
        }
        // if (c2 == " " || c2 == "\t") {
        i++;
        continue;
      }
      s += c1;
      i++;
    }
    txt = txt.substr(i);
  }
  if (cells.length > 0) res.push(cells);
  return res;
}

function stringify(ary, delimiter) {
  // check delimiter
  if (delimiter == undefined) {
    delimiter = options.delimiter;
  }
  var valueConv = genValueConverter(delimiter);
  var r = "";
  for (var i = 0; i < ary.length; i++) {
    var cells = ary[i];
    for (var j = 0; j < cells.length; j++) {
      cells[j] = valueConv(cells[j]);
    }
    r += cells.join(delimiter) + "\r\n";
  }
  return r;
}

function genValueConverter(delimiter) {
  return (function(s) {
    s = "" + s;
    var f_quot = false;
    if (s.indexOf("\n") >= 0) f_quot = true;
    if (s.indexOf(delimiter) >= 0) f_quot = true;
    if (s.indexOf('"') >= 0) {
      f_quot = true;
      s = s.replace(/\"/g, '""');
    }
    if (f_quot) s = '"' + s + '"';
    return s;
  });
}

function readFileSync(filename, encoding) {
  if (encoding == undefined) encoding = 'utf-8';
  var fs = require('fs');
  var txt;
  if (encoding != 'utf-8') {
    var iconv = require('iconv-lite');
    var bin = fs.readFileSync(filename, "binary");
    txt = iconv.decode(sjis, encoding);
  } else {
    txt = fs.readFileSync(filename, "utf-8");
  }
  return parse(txt);
}

// exports
module.exports = {
  "options"       : options,
  "parse"         : parse,
  "stringify"     : stringify,
  "readFileSync"  : readFileSync
};





