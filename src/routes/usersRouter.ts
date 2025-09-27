import { Router } from "express";
import { createUser, getUser, getUsers } from "../controllers/usersController";

const usersRouter = Router();

usersRouter.post('/', createUser)
usersRouter.post('/auth', () => {})

usersRouter.get('/:id', getUser)
usersRouter.get('/', getUsers)
usersRouter.post('/:id/status', () => {})

export default usersRouter;