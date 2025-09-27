import { Repository } from "typeorm";
import { User } from "../models/user";
import { DataSource } from "typeorm/browser";

export class UserRepository {

    repository: Repository<User>;

    constructor(ds: DataSource)  {
        this.repository = ds.getRepository(User)
    }

    createUser = (user: User) => {
        this.repository.save(user)
    }

    getUsers = () => {
        return this.repository.find()
    }

    getUserById = (userId: string) => {
        return this.repository.find({ where: { id: userId }})
    }

}

