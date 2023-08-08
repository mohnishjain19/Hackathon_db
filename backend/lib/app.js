"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//console.log("Running")
const express = require("express");
const orm_1 = require("./orm");
const path_1 = require("path");
// create and setup express app
const app = express();
//JSON stuff
app.use(express.json());

app.post("/user", async (req, res) => {
    const { Name, Email, Role } = req.body;
    const newUser = await orm_1.default.models.User.create({ Name, Email, Role });
    res.json(newUser);
});
app.get("/", async (_req, res) => {
    //Render ../public/homepage.html
    let path = (0, path_1.resolve)(__dirname + "/../public/homepage.html");
    res.sendFile(path);
});
// start express server
app.listen(8000);
console.log("Started Running Application");
