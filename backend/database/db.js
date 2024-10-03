import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "pinterest",
      useNewUrlParser: true, // Enables the new URL parser
      useUnifiedTopology: true, // Uses the new Server Discover and Monitoring engine
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDb;