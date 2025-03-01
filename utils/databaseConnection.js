import mongoose from "mongoose";

const connectToDatabase = () => {
  const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/?${process.env.MONGODB_OPTIONS}`;
  mongoose
    .connect(uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));
};

export default connectToDatabase;
