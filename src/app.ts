import express from "express";
import config from "config";
import connect from "./utils/connect";
import log from "./utils/logger";
import routes from "../routes";

const app = express();
app.use(express.json());

const port = config.get<number>("port");

app.listen(port, async () => {
  log.info(`app is running now at http://localhost:${port}`);
  await connect();
  routes(app);
});
