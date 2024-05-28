import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";

export const verifyAccessToken = async (req, res, next) => {
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid accesstoken");
      }
      req.user = decode;
      next();
    });
  } else {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Bạn chưa xác thực tài khoản");
  }
};
