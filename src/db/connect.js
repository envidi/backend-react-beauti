import mongoose from 'mongoose'
const connectDB = (url) => {
  return mongoose.connect(url).then(() => {
    // eslint-disable-next-line no-console
    console.log('Database connection established');
  })
}
export default connectDB

