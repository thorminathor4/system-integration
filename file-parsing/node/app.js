import express from "express";
import {XMLParser} from "fast-xml-parser";
import jsYaml from "js-yaml";
import csvtojson from "csvtojson";

const app = express();
app.use(express.text());

app.post("/:from/:to", (req, res) => {
    const {from, to} = req.params;
    const temp = parse(from, req.body);
    res.send(temp);
});

function parse(format, data){
    switch(format){
        case "json": return JSON.parse(data);
        case "xml":
            const xmlParser = new XMLParser();
            const output = xmlParser.parse(data);
            delete output["?xml"];
            return output;
        case "yaml": return jsYaml.load(data, 'utf8');
        case "csv": return csvtojson().fromString(data);
    }
}

const port = 3000;
app.listen(port, () => console.log("Running on port: ", port));