const csv = require('csvtojson');
const path = require("path");
csv().fromFile(path.resolve(process.argv[2])).then((jsonObj) => console.log(jsonObj[0]));