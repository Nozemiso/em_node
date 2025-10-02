import { NextFunction, Request, Response } from "express";
import z from "zod";
import jwt, { JsonWebTokenError } from "jsonwebtoken"
import { config } from "../config";
import { userRepository } from "../main";

const token = z.jwt()

type IdToken = {
    id: string
}

export const authorizeOperation = async (req: Request, res: Response, next: NextFunction) => {
    const tokenString = req.headers.authorization?.split(' ')[1]
    if (!tokenString || !token.safeParse(tokenString)) {
        res.sendStatus(401)
        return
    }
    let userId
    try {
        userId = jwt.verify(tokenString, config.jwt_secret as string)
    } catch (e) {
        if (e instanceof JsonWebTokenError) {
            res.sendStatus(401)
            return
        }
    }
    const userData = await userRepository.getUserById((userId as IdToken).id)
    if (!userData || !userData.isActive) {
        res.sendStatus(401)
        return
    }
    res.locals.authorId = userData.id
    next()
}
