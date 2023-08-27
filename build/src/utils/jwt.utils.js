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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("config"));
var privateKey = config_1.default.get("privateKey");
var publicKey = config_1.default.get("publicKey");
var signJwt = function (object, options) {
    return jsonwebtoken_1.default.sign(object, privateKey, __assign(__assign({}, (options && options)), { algorithm: "RS256" }));
};
exports.signJwt = signJwt;
var verifyJwt = function (token) {
    try {
        var decoded = jsonwebtoken_1.default.verify(token, publicKey);
        return {
            valid: false,
            expired: false,
            decoded: decoded,
        };
    }
    catch (error) {
        return {
            valid: false,
            expired: error.message === "jwt expired",
            decoded: null,
        };
    }
};
exports.verifyJwt = verifyJwt;
