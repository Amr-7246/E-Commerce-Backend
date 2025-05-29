import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";
import { setupGraphQLServer } from "./graphql/server";
dotenv.config();
const DB_URI = process.env.MONGO_CONECTION_URL || "";
mongoose
.connect(DB_URI)
.then(() => console.log("Ok Amr MongoDB Connected succesfuly now without any errors"))
.catch((err) => console.log(err));
const port = process.env.PORT || 5000;
const SERVER_START_MSG = ('Ok Amr, Your server started without any errors on port: ' + port );
const server = app.listen(port ,  () => console.log(SERVER_START_MSG) );
// * Config For Qraph Ql APIs
  async function startServer() {
    await setupGraphQLServer(app) ;
  }
// * Config For Qraph Ql APIs
process.on("unhandledRejection", (err: any) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

startServer()