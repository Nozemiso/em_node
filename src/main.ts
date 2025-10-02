import express from "express"
import { config, swaggerConfig, validateConfig } from "./config";
import { DataSource } from "typeorm";
import { User } from "./models/user";
import "reflect-metadata"
import { UserRepository } from "./repositories/usersRepository";
import { appRouter } from "./routes/baseRouter";
import expressJSDocSwagger from "express-jsdoc-swagger";

const app = express()

export let userRepository: UserRepository;

validateConfig()


export const AppDataSource = new DataSource({
    url: config.db_url as string,
    type: "postgres",
    entities: [ User ],
    synchronize: true,
    password: config.db_password as string,
    schema: config.db_schema as string,
})

app.use(express.json())
app.use(appRouter)

expressJSDocSwagger(app)(swaggerConfig)

AppDataSource.initialize()
.then(() => {
    console.log("DB connected")
    userRepository = new UserRepository(AppDataSource) 
    app.listen(config.port, (err) => 
        err
            ? console.error(`Error starting server: ${err}`)
            : console.log(`Server running at http://${config.host}:${config.port}`)        
    )
})
.catch((err) => {
    console.log(err)
})
