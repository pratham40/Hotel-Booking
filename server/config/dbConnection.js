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
// This code connects to a MongoDB database using Mongoose. It exports a function `connectDB` that attempts to connect to the database using the URI stored in the environment variable `MONGO_URI`. If the connection is successful, it logs the host of the connected database. If there is an error, it logs the error message and exits the process with a failure code.    