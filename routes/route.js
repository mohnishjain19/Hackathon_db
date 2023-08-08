const express=require("express");
const  router = express.Router()
const { allusers } = require("../controller/controller");


router.route("/users").get(allusers);




 
module.exports=router;      