import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { join } from "path";
// import auth from "./auth";

console.debug("ENV", process.env.NODE_ENV);

const environment = process.env.NODE_ENV || "development";
const API_PORT = process.env.API_PORT || 3001;
const base_route = process.env.BASE_ROUTE || "/api";

const app = express();

app.use(compression());
// this allows cross origin requests
// TODO restrict where these requests can come from
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

// native option based on body-parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  `${base_route}/images`,
  express.static(join(__dirname, "..", "images"))
);

// const base_routes = require('./routes/base');
app.get(base_route, async (req: Request, res: Response) => {
  res.send(`Hello from ${req.originalUrl}!`);
});

// DO NOT ADD DATA ROUTES WITHOUT THE AUTH THAT IS UNSAFE!!!!
// app.use(`${base_route}/lead`, auth, require("./routes/leads"));
app.use(`${base_route}/twilio`, require("./routes/twilio"));
// app.use(`/`, require("./routes/error"));

// Closing gracefully on Ctrl+C
process.on("SIGINT", async () => {
  console.log("SIGINT signal received.");
  process.exit();
});

(async function () {
  app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
})();

export {};
