import config from "./config/app";
import express, {Express, Request, Response} from "express";
import cors from "cors";
import {routes} from "./routes";

const app: Express = express(); //Initiate Express
app.use(express.json()); // parse incoming request with JSON payload
app.use(cors({
    origin: config.web_url
})); // allow specific origin for cross origin
app.use("/api", routes); // prefix /api for defined routes
app.use("*", (req: Request, res: Response) => res.send(null)); // undefined route show empty

export default app;
