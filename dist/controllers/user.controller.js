"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const services_1 = require("../services");
class UserController {
    async findAll(req, res, next) {
        try {
            const users = await services_1.userService.findAll();
            return res.json(users);
        }
        catch (e) {
            next(e);
        }
    }
    async create(req, res, next) {
        try {
            const createdUser = await services_1.userService.create(req.res.locals);
            return res.status(201).json(createdUser);
        }
        catch (e) {
            next(e);
        }
    }
    async findById(req, res, next) {
        try {
            const user = await services_1.userService.findById(req.params.id);
            return res.json(user);
        }
        catch (e) {
            next(e);
        }
    }
    async updateById(req, res, next) {
        try {
            const updatedUser = await services_1.userService.updateById(req.params.id, req.body);
            return res.status(200).json(updatedUser);
        }
        catch (e) {
            next(e);
        }
    }
    async deleteById(req, res, next) {
        try {
            await services_1.userService.deleteById(req.params.id);
            return res.sendStatus(200);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userController = new UserController();
