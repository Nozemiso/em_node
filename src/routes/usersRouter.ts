import { Router } from "express";
import { createUser, getUser, getUsers, setUserStatus } from "../controllers/usersController";

import { validateBody, validateParams } from "../middlewares/validation";
import { userIdSchema, userSchema } from "../schemas/userSchemas";
import { authorizeOperation } from "../middlewares/authorizeOperation";
import { adminAllowed, checkGuard, selfAllowed } from "../middlewares/guards";

const usersRouter = Router();

usersRouter.post('/', validateBody(userSchema), createUser)

usersRouter.get('/:id',
    authorizeOperation,
    validateParams(userIdSchema),
    adminAllowed,
    selfAllowed,
    checkGuard,
    getUser
)

usersRouter.get('/',
     authorizeOperation,
     adminAllowed,
     checkGuard,
     getUsers
)

usersRouter.post('/:id/deactivate',
    authorizeOperation,
    validateParams(userIdSchema),
    adminAllowed,
    selfAllowed,
    checkGuard,
    setUserStatus(false)
)

export default usersRouter;