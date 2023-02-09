const xml2js = require('xml2js');
const fs = require('fs');

xml2js.Parser().parseString(fs.readFileSync(process.argv[2]).toString(), (err, res) => {
    console.log(res[Object.keys(res)]);
});