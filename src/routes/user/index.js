import { Router } from "express";
import { createUser, getUsers, loginUser } from "../../controller/user/user.controller.js";

const UserRouter = Router()

UserRouter.post('/register', createUser)
UserRouter.post('/login', loginUser)
UserRouter.get('/', getUsers)


export default UserRouter