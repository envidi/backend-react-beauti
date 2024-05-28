import User from "../models/user.js";
import { StatusCodes } from "http-status-codes";
import userValidate from "../validations/userValidate.js";
import bcrypt from "bcrypt";
import ApiError from "../utils/ApiError.js";
import { AccessTokenUser } from "../middlewares/jwt.js";
export const register = async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = userValidate.validate(body, { abortEarly: true });

    if (error) {
      throw new ApiError(StatusCodes.BAD_REQUEST, new Error(error).message);
    }
    if (body.password !== body.confirmPassword) {
      res.status(400).json({
        message: "Password not match , try again !",
      });
    }
    const user = await User.findOne({ email: body.email });
    if (user) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Email đã được đăng ký!");
    }

    const hashPassword = await bcrypt.hash(body.password, 10);
    // const hashConfirmPassword = await bcrypt.hash(body.confirmPassword, 10)
    const { confirmPassword, ...rest } = body;
    const response = await User.create({
      ...rest,
      password: hashPassword,
    });

    return res.status(200).json({
      message: response ? "Đăng kí thành công" : "Đăng kí thất bại",
      response,
    });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  const body = req.body;
  try {
    const response = await User.findOne({ email: body.email });
    if (!response) {
      throw new ApiError(StatusCodes.BAD_REQUEST, " Email chưa đăng ký!");
    }
    
    const isMatch = await bcrypt.compare(body.password, response.password);
    if (!isMatch) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Password not match!");
    }

    if (response && isMatch) {
      // const { password, role, refreshToken, ...userData } = response.toObject()

      // AccessToken dùng để xác thực người dùng, phân quyền
      const accessToken = AccessTokenUser(response._id);

      await User.findByIdAndUpdate(response._id, { new: true });
      return res.status(200).json({
        message: "Signin successfully",
        accessToken,
      });
    }
  } catch (error) {
    next(error);
  }
};
export const getDetailUserById = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const detailUser = await User.findById(_id);
    if (!detailUser) {
      throw new ApiError(StatusCodes.NOT_FOUND, "No user found!");
    }
    return res.status(StatusCodes.OK).json({
      detailUser,
      message: "Success",
    });
  } catch (error) {
    next(error)
  }
};
export const getAll = async (req, res, next) => {
  try {
    const allUser = await User.find({});
    if (!allUser) {
      throw new ApiError(StatusCodes.NOT_FOUND, "No user found!");
    }
    return res.status(StatusCodes.OK).json({
      allUser,
      message: "Success",
    });
  } catch (error) {
    next(error)
  }
};
