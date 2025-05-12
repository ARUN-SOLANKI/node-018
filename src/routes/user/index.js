import { Router } from "express";
import { createUser, getUserById, getUsers, loginUser } from "../../controller/user/user.controller.js";
import { verifyUser } from "../../middleware/auth.middleware.js";

const UserRouter = Router()

UserRouter.post('/register', createUser)
UserRouter.post('/login', loginUser)
UserRouter.get('/', verifyUser,getUsers)
UserRouter.get('/:userId',verifyUser ,getUserById)


export default UserRouter