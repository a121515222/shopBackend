import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    if (!process.env.DATABASE_URI) {
      throw new Error("DATABASE_URI is not defined");
    }
    const conn = await mongoose.connect(process.env.DATABASE_URI, {
      dbName: process.env.DATABASE_NAME
    });

    console.log(`MongoDB Connected`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error(`Unexpected error: ${error}`);
    }
    process.exit(1);
  }
};

export default connectMongoDB;
