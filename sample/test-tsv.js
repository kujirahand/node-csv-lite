var CSV = require("../");

var fname = __dirname + "/test-tsv.txt";

// set tsv option
CSV.options.delimiter = "\t";
var a = CSV.readFileSync(fname);
console.log(a);

