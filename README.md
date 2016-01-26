# node-csv-lite

CSV Reader/Writer for Node.js


## Install

```
$ npm install csv-lite
```

## Usage

```
var CSV = require('csv-lite');
```

## Parse CSV

```javascript

var csv = "a,b,c\nd,e,f";
var a = CSV.parse(csv);
console.log(a[0][0]); // a
console.log(a[0][1]): // b
console.log(a[1][0]); // d
console.log(a[1][1]): // e
```

## Test moduke

```
$ mocha test/simple.js
```





