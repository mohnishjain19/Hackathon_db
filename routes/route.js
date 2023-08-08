const express=require("express");
const  router = express.Router()
const { allusers,allbooks } = require("../controller/controller");


router.route("/users").get(allusers);
router.route("/books").get(allbooks);



 
module.exports=router;      