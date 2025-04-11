import { Router } from "express";
import { createUser } from "../../controller/user/user.controller.js";

const UserRouter = Router()

UserRouter.post('/', createUser)


export default UserRouter