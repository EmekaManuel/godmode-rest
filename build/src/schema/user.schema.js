"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserschema = void 0;
var zod_1 = require("zod");
exports.createUserschema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "Name is required",
        }),
        email: (0, zod_1.string)({ required_error: "Email is required" }).email("Invalid Email"),
        password: (0, zod_1.string)({
            required_error: "Password is required",
        }).min(6, "Password is too short - should be 6 chars minimum"),
        confirmPassword: (0, zod_1.string)({
            required_error: "Confirm Password",
        }),
    }).refine(function (data) { return (data.password === data.confirmPassword,
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        }); }),
});
