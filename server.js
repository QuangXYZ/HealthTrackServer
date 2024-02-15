import * as dotenv from "dotenv";
import express, { application } from "express";
import {userRouter, studentRouter} from "./routers/index.js";
import checkToken from "./authentication/auth.js";
dotenv.config() // must have // connect file env

import connect from './database/database.js'
import { log } from "console";

const app = express()
app.use(checkToken) // Check token 
app.use(express.json())  // Read json file
const port = process.env.PORT || 3000;


//router
app.use("/users", userRouter)
app.use("/students", studentRouter)

app.get('/', (req, res) => {
  res.send("Hello world! quang nguyn")
})
app.listen(port, async (req, res) => {
  await connect()  // Connect to database MongoDB before listening
  console.log('listening on port ' + port);
})


