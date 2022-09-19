"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.myDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "./database/database.sqlite",
    entities: [__dirname + '/../**/*.entity.js'],
    logging: true,
    synchronize: true,
});
