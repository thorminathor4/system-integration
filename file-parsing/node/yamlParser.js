const yaml = require('js-yaml');
const fs = require('fs');

try {
    let data = yaml.load(fs.readFileSync(process.argv[2], 'utf8'));
    console.log(data);
} catch (e) {
    console.log(e);
}