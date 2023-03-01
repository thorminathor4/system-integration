import express from "express";
const app = express();
app.use(express.json());

import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, // Max requests per client per "window"
    standardHeaders: true, 
    legacyHeaders: false
});
app.use(limiter);

import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const swaggerDefinition = {
    openai: "3.0.0",
    info: {
        title: "OpenAPI Example API",
        version: "1.0.0",
        description: "A simple Express API that utilizes OpenAPI"
    }
};

const options = {
    swaggerDefinition,
    apis: ["./routers/*.js"]
};
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(options)));

import usersRouter from "./routers/usersRouter.js";
app.use(usersRouter);

app.get("/", (req, res) => res.redirect("./docs"));

app.listen(8080, () => console.log("Server is listening on port:", 8080));