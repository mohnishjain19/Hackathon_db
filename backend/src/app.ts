//console.log("Running")
import * as express from "express"
import { Request, Response } from "express"
import sequelize from "./orm"



// create and setup express app
const app = express()

//JSON stuff
app.use(express.json())

app.post("/user" , async (req : Request , res : Response) => {
    const {Name, Email, Role} = req.body; 
    const newUser = await sequelize.models.User.create({Name, Email, Role});
    res.json(newUser);
});


// start express server
app.listen(3000);
console.log("Started Running Application");
