
import { Router } from "express";
import { register,login, getDetailUserById, getAll } from "../controllers/user.js";
import { verifyAccessToken } from "../middlewares/verifyToken.js";


const routerUser = Router();

routerUser.get("/all",  getAll);
routerUser.get("/detail", verifyAccessToken, getDetailUserById);
routerUser.post("/register", register);
routerUser.post("/login", login);




export default routerUser;
