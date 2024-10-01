const mongoose = require("mongoose")

const connection = async () => {
    try{
        await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log("Connected to MongoDB")
    }catch(e){
        console.log(e)
    }
}

connection()