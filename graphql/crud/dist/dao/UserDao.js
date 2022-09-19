"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDao = void 0;
const app_data_source_1 = require("../app-data-source");
const User_1 = require("../entities/User");
class UserDao {
    constructor() {
        this.userRepository = app_data_source_1.myDataSource.getRepository(User_1.User);
        this.getUsers = () => __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepository.find();
            return users;
        });
        this.getUser = (id) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ where: { id: id } });
            return user;
        });
        this.createUser = (user) => __awaiter(this, void 0, void 0, function* () {
            const created = yield this.userRepository.save(user);
            return created;
        });
        this.deleteUser = (id) => __awaiter(this, void 0, void 0, function* () {
            const deleted = yield this.userRepository.delete(id);
            return deleted;
        });
    }
}
exports.UserDao = UserDao;
