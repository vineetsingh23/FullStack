import mongoose from 'mongoose';
import { DATABASE } from './constant';

import express from 'express';

const app = express();

(async()=>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DATABASE}`)
        app.on("error",()=>{
            console.log("ERR",error);
            throw error
            
        })
    } catch (error) {
        console.log("ERROR", error);
        throw err
        
    }
})()