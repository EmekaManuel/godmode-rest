import { Express, Request, Response } from "express";
import { createUserHandler } from "../src/controller/user.controller";
import validateResource from "../src/middleware/validateResource";
import { createUserschema } from "../src/schema/user.schema";
import { createUserSessionHandler } from "../src/controller/session.controller";
import { createSessionSchema } from "../src/schema/session.schema";

function routes(app: Express) {
  //   app.get("/healthcare", (req: Request, res: Response) => res.sendStatus(200));
  app.post("/api/users", validateResource(createUserschema), createUserHandler);
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );
}

export default routes;
