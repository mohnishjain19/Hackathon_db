const express=require("express");
const  router = express.Router()
const { allusers,allbooks,allmanagers ,register,deleteuser,userSpecificBooks} = require("../controller/controller");


router.route("/users").get(allusers);
router.route("/managers").get(allmanagers);
router.route("/books").get(allbooks);
router.route("/create").post(register);
router.route("/delete").delete(deleteuser);
router.route("/userbonds").get(userSpecificBooks);
 
module.exports=router;      