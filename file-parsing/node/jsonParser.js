const fs = require("fs");
const path = require("path");
const input = JSON.parse(fs.readFileSync(path.resolve(process.argv[2])).toString());
console.log(input);