import { NextFunction, Request, Response } from "express";
import z from "zod";

export const validateBody = (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) res.status(400).send(result.error)
    else next()
}

export const validateParams = (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);
    if (!result.success) res.status(400).send(result.error)
    else next()
}
