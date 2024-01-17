const mongoose = require('mongoose')
require('dotenv').config()
const mongoURL = process.env.MONGODB_URL

mongoose.connect(mongoURL).then(() => {
    console.log('connected to mongodb')
}).catch((err: any) => console.log(err))