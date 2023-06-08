"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const models_1 = require("../models");
class UserService {
    async findAll() {
        return models_1.User.find().select("-password");
    }
    async create(data) {
        return models_1.User.create({ ...data });
    }
    async findById(id) {
        return models_1.User.findById(id);
    }
    async updateById(id, value) {
        return models_1.User.findOneAndUpdate({ _id: id }, { ...value }, { returnDocument: "after" });
    }
    async deleteById(id) {
        await models_1.User.deleteOne({ _id: id });
    }
}
exports.userService = new UserService();
