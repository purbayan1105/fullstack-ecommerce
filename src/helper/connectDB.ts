import mongoose from "mongoose";

const configDB = {
  isConnected: 0,
};

export const connectDB = async () => {
  if (configDB.isConnected) {
    console.log("Database already connected");
    return;
  } else {
    try {
      const { connection } = await mongoose.connect(
        process.env.Mongo_DB_URL as string,

        { dbName: "ecom-database-manager" }
      );
      console.log("DB connected");
    } catch (error: any) {
      console.log("error at connectDB page", error.message);
    }
  }
};
