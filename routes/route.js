const express=require("express");
const { route } = require("../app");
const { registerUser } = require("../controller.js/controller");
const router =express.Router();



route.route("/register").post(registerUser);




 
module.exports=router;      