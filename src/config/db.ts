import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
try {
    const conn = await mongoose.connect(process.env.MONGO_CONECTION_URL as string);
    console.log(`Super good Amr, Your MongoDB Now connected succesfully At that Host : ${conn.connection.host}`);
} catch (error) {
    console.error(" Sorry Amr, But we finde a MongoDB connection error And here is it . . . ", error);
    process.exit(1); // * Exit app if DB fails
}
};

export default connectDB;
