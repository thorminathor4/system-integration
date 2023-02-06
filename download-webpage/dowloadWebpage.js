const util = require("util");
const http = require("http");
const fs = require("fs");

var options = {
    host: "www.google.com",
    port: 80,
    path: "/"
};

var content = "";   

var req = http.request(options, res => {
    res.setEncoding("utf8");
    res.on("data", chunk => content += chunk);
    res.on("end", () => fs.writeFile("index.html", content, () => {}));
});

req.end();