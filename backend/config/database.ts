import mongoose from 'mongoose'
import dotenv from 'dotenv'
// Load environment variables from .env file.
dotenv.config()

const mongoURL = process.env.MONGODB_URL
if(!mongoURL) {
    throw new Error('ENV::Database URL is required!')
}
mongoose.connect(mongoURL).then(() => {
    console.log('connected to mongodb')
}).catch((err: any) => console.log(err))