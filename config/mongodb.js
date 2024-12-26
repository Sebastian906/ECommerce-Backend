import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected',() => {
        console.log("Base de datos conectada");
    })
    
    await mongoose.connect(`${process.env.MONGO_URI}/ecommerce`)
}

export default connectDB;