//console.log("Running")
import * as express from "express"
import { Request, Response } from "express"
import sequelize from "./orm"



// create and setup express app
const app = express()

//JSON stuff
app.use(express.json())

app.post("/user" , async (req : Request , res : Response) => {
    const {name , email } = req.body; 
    const newUser = await sequelize.models.User.create({name , email});
    res.json(newUser);
});


// start express server
app.listen(3000);
console.log("Started Running Application");
