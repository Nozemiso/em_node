import { Repository } from "typeorm";
import { User } from "../models/user";
import { DataSource } from "typeorm/browser";
export class UserRepository {

    repository: Repository<User>;

    constructor(ds: DataSource)  {
        this.repository = ds.getRepository(User)
    }

    createUser = (user: User) => {
        return this.repository.save(user)
    }

    getUsers = () => {
        return this.repository.find()
    }

    getUserById = (userId: string) => {
        return this.repository.findOne({ where: { id: userId }})
    }

    setStatusById = (userId: string, status: boolean) => {
        this.repository.update({ id: userId }, { isActive: status})
    }
    
    getAuthInfo = (email: string) => {
        return this.repository.findOne({ where: { email }, select: { email: true, password: true, id: true, isActive: true}})
    }

}

