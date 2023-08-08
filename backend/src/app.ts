//NOTE: Do not use this file. Typescript compilation has been stopped way earlier. Find the files in lib folder 
//console.log("Running")
import * as express from "express"
import { Request, Response } from "express"
import sequelize from "./orm"
import {resolve as pathresolve} from "path";



// create and setup express app
const app = express()

//JSON stuff
app.use(express.json())



app.post("/user" , async (req : Request , res : Response) => {
    const {Name, Email, Role} = req.body; 
    const newUser = await sequelize.models.User.create({Name, Email, Role});
    res.json(newUser);
});

app.get("/" , async (_req : Request, res : Response) => {
    //Render ../public/homepage.html
    let path = pathresolve(__dirname + "/../public/homepage.html")
    res.sendFile(path);
});


// start express server
app.listen(8000);
console.log("Started Running Application");
