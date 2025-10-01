import express from "express"
import config from "./config";
import usersRouter from "./routes/usersRouter";
import { DataSource } from "typeorm";
import { User } from "./models/user";
import "reflect-metadata"
import { UserRepository } from "./repositories/usersRepository";
import { validateBody } from "./middlewares/validation";
import { signinSchema } from "./schemas/authSchemas";
import { signin } from "./controllers/usersController";

const app = express()
export let userRepository: UserRepository;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "postgres",
    schema: "em_node",
    entities: [ User ],
    synchronize: true
})

AppDataSource.initialize()
.then(() => {
    console.log("DB connected")
    userRepository = new UserRepository(AppDataSource) 
})
.catch((err) => {
    console.log(err)
})

app.use(express.json())

app.use('/signin', validateBody(signinSchema), signin)
app.use('/users/', usersRouter)

app.listen(config.port, (err) =>
    err
        ? console.error(`Error starting server: ${err}`)
        : console.log(`Server running at http://localhost:${config.port}`)
);