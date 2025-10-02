import { Router } from "express";
import { createUser, getUser, getUsers, setUserStatus } from "../controllers/usersController";

import { validateBody, validateParams } from "../middlewares/validation";
import { userIdSchema, userSchema } from "../schemas/userSchemas";
import { authorizeOperation } from "../middlewares/authorizeOperation";
import { adminAllowed, checkGuard, selfAllowed } from "../middlewares/guards";

const usersRouter = Router();


/**
 * GET /users/
 * @tags User
 * @security BearerAuth
 * @return {array<UserObject>} 200 - Success
 * @return 401 - Unauthorized
 * @return 403 - Forbidden
 */
usersRouter.get('/',
     authorizeOperation,
     adminAllowed,
     checkGuard,
     getUsers
)

/**
 * POST /users/
 * @tags User
 * @param {CreateUserSchema} request.body.reqired
 * @return {UserObject} 201 - Created
 * @return 400 - Bad request
 * @return 409 - Conflict
 */
usersRouter.post('/', validateBody(userSchema), createUser)


/**
 * GET /users/{id}
 * @tags User
 * @security BearerAuth
 * @param {string} id.path
 * @return {UserObject} 200
 * @return 400 - Bad request
 * @return 401 - Unauthorized
 * @return 403 - Forbidden
 * @return 404 - Not found
 */
usersRouter.get('/:id',
    authorizeOperation,
    validateParams(userIdSchema),
    adminAllowed,
    selfAllowed,
    checkGuard,
    getUser
)


/**
 * POST /users/{id}/deactivate
 * @tags User
 * @security BearerAuth
 * @param {string} id.path
 * @return 200 - Success
 * @return 400 - Bad request
 * @return 401 - Unauthorized
 * @return 403 - Forbidden
 * @return 404 - Not found
 */
usersRouter.post('/:id/deactivate',
    authorizeOperation,
    validateParams(userIdSchema),
    adminAllowed,
    selfAllowed,
    checkGuard,
    setUserStatus(false)
)

export default usersRouter;