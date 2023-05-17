import express from "express";
import cors from "cors";
import morgan from "morgan";
import {LowSync} from "lowdb";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import booksRouter from "./routers/bookRouter.js";

const PORT = process.env.PORT || 4000;

import {JSONFileSync} from "lowdb/node";

const adapter = new JSONFileSync("db.json");
const db = new LowSync(adapter, {books: []});

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "A simple Express Library API"
        },
        servers: [{url: `http://localhost:${PORT}`}]
    },
    apis: ["./routers/*.js"]
};

const specs = swaggerJsDoc(options);

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.db = db;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/books", booksRouter);

app.listen(PORT, () => console.log(`The server is listening on port ${PORT}`));