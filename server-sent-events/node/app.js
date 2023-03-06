import express from "express";
const app = express();

app.use(express.static("public"));

app.get("/synchronize-time", (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
    });
    setInterval(() => {
        const time = new Date().toTimeString();
        res.write(`data: ${time}\n\n`);
    }, 1000);
});

const PORT = 8080;
app.listen(PORT, () => console.log("Server running on port:", PORT));