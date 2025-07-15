import mongoose from "mongoose";

export async function connectTODB() {
  try {
    console.log("Awaiting to connect to MONGODB...");
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MONGODB successfully!");
  } catch (error) {
    console.log(error);
    process.exit(1); // Exit the process with failure
  }
}
