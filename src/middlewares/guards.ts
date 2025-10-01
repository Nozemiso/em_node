import { NextFunction, Request, Response } from "express";
import { userRepository } from "../main";
import { UserRole } from "../models/user";

export const adminAllowed = async (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.isALlowed) next() 
    const authorId = res.locals.authorId
    const authorData = await userRepository.getUserById(authorId)
    if (authorData?.role == UserRole.ADMIN) res.locals.isAllowed = true;
    next()
}

export const selfAllowed = async (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.isALlowed) next() 
    const authorId = res.locals.authorId
    const targetId = req.params.id
    if (authorId == targetId) res.locals.isAllowed = true;
    next()
}

export const checkGuard = (req: Request, res: Response, next: NextFunction) => {
    const isALlowed = res.locals.isAllowed;
    if (isALlowed) next()
    else res.sendStatus(403)
}