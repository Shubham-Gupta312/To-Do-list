const mongoose = require('mongoose')
const mongo_URI = "mongodb://localhost:27017/Diary?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
const mongoAtlas = 'mongodb+srv://shubham7065:ShubhamMongo@123@notescluster.nez6l.mongodb.net/Diary?retryWrites=true&w=majority'

const connectToMongo = () => {
    mongoose.connect(mongo_URI, () => {
        console.log("Connected Successfully!");
    })
}

module.exports = connectToMongo;