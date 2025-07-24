import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}/hotel-booking`);
        console.log(`MongoDB Connected: ${conn.connection.name} on ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;