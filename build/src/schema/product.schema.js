"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductSchema = exports.updateProductSchema = exports.getProductSchema = exports.createProductSchema = void 0;
var zod_1 = require("zod");
var payload = {
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({
            required_error: "Title is required",
        }),
        description: (0, zod_1.string)({ required_error: "Description is required" }).min(120, "Description should be at least 120 words"),
        price: (0, zod_1.number)({ required_error: "Price is required" }),
        image: (0, zod_1.string)({ required_error: "Image is required" }),
    }),
};
var params = {
    params: (0, zod_1.object)({
        productId: (0, zod_1.string)({
            required_error: "ProductId is required",
        }),
    }),
};
exports.createProductSchema = (0, zod_1.object)(__assign({}, payload));
exports.getProductSchema = (0, zod_1.object)(__assign({}, params));
exports.updateProductSchema = (0, zod_1.object)(__assign(__assign({}, payload), params));
exports.deleteProductSchema = (0, zod_1.object)(__assign({}, params));
