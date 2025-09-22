import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Successfully Connected to DB");
    } catch (error) {
        console.log(`Error.!! ${error}`);
        process.exit(1);
    }
};
export default connectDB;