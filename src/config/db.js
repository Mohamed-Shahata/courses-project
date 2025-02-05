import mongoose from "mongoose";

const connection_DB = async () => {
  return await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Success"))
    .catch((err) => console.log("MongoDB Connection error: ", err));
}

export default connection_DB;