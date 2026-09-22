// /import dns from "node:dns";
// dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import env from "./config/env.js";
import connectDB from "./config/db.js";
import employeeRoutes from './routes/employeeRoutes.js'
import departmentRoutes from './routes/departmentRoutes.js'

const app = express();

connectDB();

app.use(express.json());


// Empployee routes


app.use("/api/employees",employeeRoutes);

app.use("/api/departments",departmentRoutes)





app.listen(env.port, () => {
  console.log(`application is running on port: ${env.port}`);
});
