const express=require("express");
const  router = express.Router()
const { allusers,allbooks,allmanagers ,register} = require("../controller/controller");


router.route("/users").get(allusers);
router.route("/managers").get(allmanagers);
router.route("/books").get(allbooks);
router.route("/create").post(register);

 
module.exports=router;      