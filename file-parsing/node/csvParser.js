const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");
const inputString = fs.readFileSync(path.resolve(process.argv[2])).toString();
const values = [];
const parser = parse({columns: true, cast: true});
parser.on('readable', () => {
    let value;
    console.log("Its readable");
    while ((value = parser.read()) !== null){
        values.push(value);
        console.log(value);
    }
});
parser.on('error', (error) => console.error(error.message));
parser.on('end', () => console.log(values));
parser.write(inputString);
parser.end();