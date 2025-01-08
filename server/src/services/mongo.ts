import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error("MongoDB URL is not defined in the .env file.");
}

mongoose.connection.once("open", () =>
  console.log("MongoDB connection ready!")
);
mongoose.connection.on("error", (err: Error) => {
  console.error(err);
});

export const mongoConnect = async () => {
  await mongoose.connect(MONGO_URL);
};

export const mongoDisconnect = async () => {
  await mongoose.disconnect();
};
