import mongoose from "mongoose";

export default function connet() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connetion successfully");
    });
    connection.on("error",(err) => {
      console.log(
        "Mongogdb connetions error please make sure mogodb is runnig" + err
      );
      process.exit();
    });
  } catch (error) {
    console.error("Something goes Wrong");
    console.log(error);
  }
}
