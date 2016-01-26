var CSV = require("../");

var fname = __dirname + "/test-utf8.csv";
var fname_sjis = __dirname + "/test-sjis.csv";

// test1
var a = CSV.readFileSync(fname);
console.log(a);

// test2
CSV.readFile(fname, function(err, a) {
  console.log(a);
});

// test3
CSV.readFile(fname_sjis, "Shift_JIS", function(err, a) {
  console.log(a);
});

