"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_controller_1 = require("../src/controller/user.controller");
var validateResource_1 = __importDefault(require("../src/middleware/validateResource"));
var user_schema_1 = require("../src/schema/user.schema");
var session_controller_1 = require("../src/controller/session.controller");
var session_schema_1 = require("../src/schema/session.schema");
var product_schema_1 = require("../src/schema/product.schema");
var product_controller_1 = require("../src/controller/product.controller");
function routes(app) {
    //   app.get("/healthcare", (req: Request, res: Response) => res.sendStatus(200));
    app.post("/api/users", (0, validateResource_1.default)(user_schema_1.createUserschema), user_controller_1.createUserHandler);
    app.post("/api/sessions", (0, validateResource_1.default)(session_schema_1.createSessionSchema), session_controller_1.createUserSessionHandler);
    app.post("/api/products", [requireUser, (0, validateResource_1.default)(product_schema_1.createProductSchema)], product_controller_1.createProductHandler);
    app.put("/api/products/:productId", [requireUser, (0, validateResource_1.default)(product_schema_1.updateProductSchema)], product_controller_1.updateProductHandler);
    app.get("/api/products/:productId", (0, validateResource_1.default)(product_schema_1.getProductSchema), product_controller_1.getProductHandler);
    app.delete("/api/products/:productId", [requireUser, (0, validateResource_1.default)(product_schema_1.deleteProductSchema)], product_controller_1.deleteProductHandler);
}
exports.default = routes;
