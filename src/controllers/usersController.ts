import { Request, Response } from "express"
import { userRepository } from "../main";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { config } from "../config";

export const createUser = async (req: Request, res: Response) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 1)
    userRepository.createUser({ ...req.body, password: hashedPassword}).then((result) => {
        res.status(201).send(result)
    }).catch(() => {
        res.sendStatus(409)
    })
}

export const getUsers = async (req: Request, res: Response) => {
    const result = await userRepository.getUsers()
    res.send(result)
}

export const getUser = async (req: Request, res: Response) => {
    const id = req.params.id as string
    userRepository.getUserById(id).then((user) => {
        if (!user) res.sendStatus(404)
        else res.send(user)
    }).catch((err) => {
        res.status(500).send(err)
    })
}

export const setUserStatus = (status: boolean) => async (req: Request, res: Response) => {
    const id = req.params.id as string
    userRepository.getUserById(id).then((user) => {
        if (!user) res.sendStatus(404)
        else return userRepository.setStatusById(id, status)
    }).then(() => {
        res.sendStatus(200)
    }).catch((err) => {
        res.status(500).send(err)
    })
}

export const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body   
    userRepository.getAuthInfo(email).then((result) => {
        if (!result || !result.isActive) res.sendStatus(404);
        else {
            if (bcrypt.compareSync(password, result.password)) {
                const payload = {
                    token: jwt.sign({ id: result.id }, config.jwt_secret as string, { expiresIn: "1d" })
                }
                res.status(200).send(payload)
            }
            else res.sendStatus(401)
        }
    }).catch((err) => {
         res.status(500).send(err)
    })
}