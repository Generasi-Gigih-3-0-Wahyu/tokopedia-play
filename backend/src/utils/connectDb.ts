import mongoose from "mongoose";
import "dotenv/config";
import env from "./validateEnv";
import log from "./logger";

async function connectDb() {
  const port = env.PORT;
  const connectionString = env.MONGO_CONNECTION_STRING;
  try {
    console.log("db string",env.MONGO_CONNECTION_STRING);
    console.log("Port", port);
    await mongoose.connect(connectionString);
    log.info("Connected to MongoDB");
    log.info(`App started at http://localhost:${port}/api/v1/`);
  } catch (err: any) {
    log.error(err);
    process.exit(1);
  }
}

const conn = mongoose.connection;

conn.on("error", () => log.error.bind(console, "Connection error"));
conn.once("open", () => log.info("Connection to Database is Successful"));

export { conn };

export default connectDb;
