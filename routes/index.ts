import { Express, Request, Response } from "express";
import { createUserHandler } from "../src/controller/user.controller";
import validateResource from "../src/middleware/validateResource";
import { createUserschema } from "../src/schema/user.schema";
import { createUserSessionHandler } from "../src/controller/session.controller";
import { createSessionSchema } from "../src/schema/session.schema";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "../src/schema/product.schema";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from "../src/controller/product.controller";

function routes(app: Express) {
  //   app.get("/healthcare", (req: Request, res: Response) => res.sendStatus(200));
  app.post("/api/users", validateResource(createUserschema), createUserHandler);
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.post(
    "/api/products",
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
  );
  app.put(
    "/api/products/:productId",
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  );

  app.get(
    "/api/products/:productId",
    validateResource(getProductSchema),
    getProductHandler
  );

  app.delete(
    "/api/products/:productId",
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
  );
}

export default routes;
