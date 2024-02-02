import * as dotenv from "dotenv";
import express, { application } from "express";
import {userRouter, studentRouter} from "./routers/index.js";
dotenv.config() // must have // connect file env
import connect from './database/database.js'

const app = express()
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




// const cors = require("cors")

// const mongoose = require("mongoose")
// const bodyParser = require("body-parser") 
// const morgan = require("morgan")
// //CONNECT DATABASE
// mongoose.connect("mongodb+srv://quangkasumi:dV757vVFBZRgXoMT@cluster0.fbejs7v.mongodb.net/?retryWrites=true&w=majority")
// .catch(()=>{
//   console.log(`Connect database`)
// })

// app.use(bodyParser.json({limit: "50mb"}))
// app.use(cors())
// app.use(morgan("common"))


// app.get("/api", (req,res) => {
//   res.send("Hello")
// })
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })



