const mongoose = require('mongoose')
const mongo_URI = "mongodb://localhost:27017/Diary?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connectToMongo = () => {
    mongoose.connect(mongo_URI, () => {
        console.log("Connected Successfully!");
    })
}

module.exports = connectToMongo;