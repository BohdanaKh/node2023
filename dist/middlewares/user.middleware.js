"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const mongoose_1 = require("mongoose");
const errors_1 = require("../errors");
const models_1 = require("../models");
const validators_1 = require("../validators");
class UserMiddleware {
    isCreateValid(req, res, next) {
        try {
            const { error, value } = validators_1.UserValidator.create.validate(req.body);
            if (error) {
                throw new errors_1.ApiError(error.message, 400);
            }
            req.res.locals = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isUserIdExist(req, res, next) {
        try {
            const user = await models_1.User.findById(req.params.id);
            if (!user) {
                throw new errors_1.ApiError("user is not found", 400);
            }
            res.locals.user = user;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    isUpdateValid(req, res, next) {
        try {
            const { error, value } = validators_1.UserValidator.update.validate(req.body);
            if (error) {
                throw new errors_1.ApiError(error.message, 400);
            }
            req.body = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isMongoIdValid(req, res, next) {
        try {
            if (!(0, mongoose_1.isObjectIdOrHexString)(req.params.id)) {
                throw new errors_1.ApiError("id is not valid", 400);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userMiddleware = new UserMiddleware();
