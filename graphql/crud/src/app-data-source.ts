import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
    type: "sqlite",
    database: "./database/database.sqlite",
    entities: [__dirname + '/../**/*.entity.js'],
    logging: true,
    synchronize: true,
})