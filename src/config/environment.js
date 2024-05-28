import dotenv from 'dotenv'
dotenv.config()

export const env = {
  PORT: process.env.PORT,
  JWT_SECRET : process.env.JWT_SECRET,
  MONGO_URI : process.env.MONGO_URI,
  HOST_NAME :  process.env.HOST_NAME,
  BUILD_MODE : process.env.BUILD_MODE,
}
