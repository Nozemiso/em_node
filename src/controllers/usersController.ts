import { Request, Response } from "express"
import { userRepository } from "../main";
import { TypeORMError } from "typeorm";

export const createUser = (req: Request, res: Response) => {
    console.log(req.body)
    res.send(200);
}

export const getUsers = async (req: Request, res: Response) => {
    const result = await userRepository.getUsers()
    res.send(result)
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        const result = await userRepository.getUserById(id)
    }
    catch (e) {
        if (e instanceof TypeORMError) res.status(400).send(e.message)
        return
    }
    res.sendStatus(200)
}

