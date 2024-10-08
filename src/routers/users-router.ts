import {Router} from "express"
import {usersController} from "../controllers/users-controller";
import {authBasicMiddleware} from "../common/middlewares/auth-basic-middleware";
import {inputValidationMiddleware} from "../common/middlewares/input-validation-middlware";
import {usersInputValidationMiddleware} from "../validators/users-input-validation-middleware";

export const usersRouter = Router()

usersRouter.post('/', authBasicMiddleware, usersInputValidationMiddleware, inputValidationMiddleware, usersController.create.bind(usersController))
usersRouter.get('/', authBasicMiddleware, inputValidationMiddleware, usersController.get.bind(usersController))
usersRouter.delete('/:id', authBasicMiddleware, inputValidationMiddleware, usersController.delete.bind(usersController))