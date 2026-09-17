import mongoose from "mongoose";
// import env from "./env.js";

const db ="mongodb://fullstack-app:vineet123@webdeveloper.uagsjrp.mongodb.net/?appName=WebDeveloper";
mongoose.set("strictQuery", true, "useNewUrlParser", true);

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log(`MongoDB Atlas Connected successfully!!`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// // Helper function to return human-readable connection states
// const getDBStatus = () => {
//   const states = {
//     0: 'Disconnected',
//     1: 'Connected',
//     2: 'Connecting',
//     3: 'Disconnecting',
//   };

//   const stateCode = mongoose.connection.readyState;

//   return {
//     status: states[stateCode] || 'Unknown',
//     readyState: stateCode,
//     host: stateCode === 1 ? mongoose.connection.host : null,
//     dbName: stateCode === 1 ? mongoose.connection.name : null,
//   };
// };

export default connectDB;
