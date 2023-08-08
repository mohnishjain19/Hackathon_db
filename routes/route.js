const express=require("express");
const  router = express.Router()
const { allusers,allbooks,allmanagers ,register,deleteuser,userSpecificBooks,settledTrades,tradesByBooks,tradesByBooksid} = require("../controller/controller");


//Fetching Al users
router.route("/users").get(allusers);

// Fetching all managers
router.route("/managers").get(allmanagers);

// Fetching all books
router.route("/books").get(allbooks);

// Register user.monager
router.route("/create").post(register);

// Delete user/manager
router.route("/delete").delete(deleteuser);

// Show user specific ond
router.route("/userbonds").get(userSpecificBooks);

// Display all settled Trades
router.route("/settledtrade").get(settledTrades);

// Display trades for every book
router.route("/booktrade").get(tradesByBooks);

// display trade from specific book_id
router.route("/booktradeid").get(tradesByBooksid);



module.exports=router;      