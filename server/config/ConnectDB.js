import mongoose from "mongoose";
export const ConnectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("database is connected")
    );
    await mongoose.connect(process.env.DB_CON_STRING);
  } catch (err) {
    console.log(err.message);
  }
};
