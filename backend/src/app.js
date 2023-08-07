//console.log("Running")


import * as express from "express"
import { Request, Response } from "express"

// create and setup express app
const app = express()

//JSON stuff
app.use(express.json())

//NOTE:  register routes from hereon
