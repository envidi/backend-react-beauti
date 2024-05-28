
import { Router } from "express";
import { register,login, getDetailUserById } from "../controllers/user.js";
import { verifyAccessToken } from "../middlewares/verifyToken.js";


const routerUser = Router();

routerUser.get("/detail", verifyAccessToken, getDetailUserById);
routerUser.post("/register", register);
routerUser.post("/login", login);




export default routerUser;
