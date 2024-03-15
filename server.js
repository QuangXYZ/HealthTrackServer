import * as dotenv from "dotenv";
import express, { application } from "express";
import {userRouter, studentRouter, healthActivityRouter, challengeRouter, healthCycleRouter, heightWeightRouter, stepRouter, goalsRouter} from "./routers/index.js";
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
app.use("/healthActivity", healthActivityRouter)
app.use("/challenges", challengeRouter)
app.use("/healthCycle", healthCycleRouter)
app.use("/heightWeight", heightWeightRouter)
app.use("/step", stepRouter)
app.use("/goals", goalsRouter)

app.get('/', (req, res) => {
  res.send("Hello world!")
})
app.listen(port, async (req, res) => {
  await connect()  // Connect to database MongoDB before listening
  console.log('listening on port ' + port);
})


