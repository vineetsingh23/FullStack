import mongoose from 'mongoose';
import { DATABASE } from './constant.js';

const connectDB = async () => {
    try {
      const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DATABASE}`)
      console.log(`\n MONGODB database connected successfully ! DB HOST: ${connectionInstance.connection.host}!`);
      
    } catch (error) {
        console.log("MONGODB connection failed !! ",error);
        process.exit();
    }
}

export default connectDB;

















// import express from 'express';

// const app = express();

// (async()=>{
//     try {
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DATABASE}`)
//         app.on("error",(error)=>{
//             console.log("ERR",error);
//             throw error
            
//         })
//         app.listen(process.env.PORT), ()=>{
//             console.log(`App is listening on port : ${process.env.PORT}`)
//         }

//     } catch (error) {
//         console.log("ERROR", error);
//         throw err
        
//     }
// })()