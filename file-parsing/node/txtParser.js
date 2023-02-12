const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.resolve(process.argv[2])).toString();
const output = {};
input.split("\n").map(x => {
    let {0: key, 1: val} = x.split("=");
    if(val.includes(",")) val = val.split(",");
    val = Number(val) || val;
    output[key] = val;
});

console.log(output);