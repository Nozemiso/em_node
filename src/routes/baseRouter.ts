import { Router } from "express";
import usersRouter from "./usersRouter";
import { validateBody } from "../middlewares/validation";
import { signin } from "../controllers/usersController";
import { signinSchema } from "../schemas/authSchemas";

export const appRouter = Router();


/**
 * POST /signin
 * @tags auth
 * @param {SigninSchema} request.body.required
 * @return {TokenSchema} 200
 * @return 400 - Bad request
 * @return 401 - Unauthorized
 * @return 404 - Not found
 */
appRouter.post('/signin', validateBody(signinSchema), signin)
appRouter.use('/users', usersRouter)