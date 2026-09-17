import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import env from "./config/env.js";
import connectDB from "./config/db.js";

// const  PORT = 8000
const app = express();

connectDB();

app.get("/", (req, res) => {
  res.send(`<h1>Database connections successfull</h1>`);
});

app.listen(env.port, () => {
  console.log(`application is running on port: ${env.port}`);
});
