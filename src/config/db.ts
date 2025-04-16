import mongoose from "mongoose";

const connectDB = async () => {
try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://aehab7246:<Dr.72amrsaad46>@e-commerce.tm7qgt0.mongodb.net/?retryWrites=true&w=majority&appName=E-Commerce");
    console.log(` MongoDB connected: ${conn.connection.host}`);
} catch (error) {
    console.error(" MongoDB connection error:", error);
    process.exit(1); // Exit app if DB fails
}
};

export default connectDB;
