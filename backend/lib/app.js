"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//console.log("Running")

//Dotenv config 
const dotenv = require("dotenv");
const path_1 = require("path");
dotenv.config({path : path_1.resolve(__dirname + "/.env")});

const express = require("express");
const orm_1 = require("./orm");
const html_tablify = require("html-tablify");
// create and setup express app
const app = express();
//JSON stuff
app.use(express.json());

const  cookieParser =require("cookie-parser");
const  bodyParser=require("body-parser");
const cors=require("cors");


app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));;
app.use(cors());
app.use(cookieParser());

process.on("uncaught Exception",(err)=>{
    console.log(`Error: ${err}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    process.exit(1);
});

process.on("unhandledRejection", (err) => {
    // console.log('Error: ${err.message}`);
    console.log(`Error: ${err}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    process.exit(1);
});


app.post("/secretmake/user", async (req, res) => {
    const { Name, Email, Role } = req.body;
    const newUser = await orm_1.default.models.User.create({ Name, Email, Role });
    res.json(newUser);
});

app.post("/secretmake/book", async (req, res) => {
    const {Id, BookName} = req.body;
    const newBook = await orm_1.default.models.Book.create({Id, BookName});
    res.json(newBook);
});

app.post("/secretmake/bookuser", async (req, res) => {
    const {BookId, UserId} = req.body;
    const newBookUser = await orm_1.default.models.BookUser.create({BookId, UserId});
    res.json(newBookUser);
});

app.post("/secretmake/counterparty", async (req, res) => {
    const {id, Name} = req.body;
    const newCounterParty = await orm_1.default.models.CounterParty.create({id, Name});
    res.json(newCounterParty);
});

app.post("/secretmake/security", async (req, res) => {
    const {id,Status, ISIN, CUSIP , Issuer, MaturityDate, Coupon, Type, FaceValue } = req.body;
    const newSecurity = await orm_1.default.models.Security.create({id,Status, ISIN, CUSIP , Issuer, MaturityDate, Coupon, Type, FaceValue });
    res.json(newSecurity); 
});

app.post("/secretmake/trade" , async (req , res) => {
    const {id, BookId, CounterPartyId, SecurityId, Price, Quantity, Status, Buy_Sell, TradeDate, SettlementDate} = req.body;
    const newTrade = await orm_1.default.models.Trade.create({id, BookId, CounterPartyId, SecurityId, Price, Quantity, Status, Buy_Sell, TradeDate, SettlementDate});
    res.json(newTrade);
});

const secretroutes = ["User" , "Book" , "BookUser" , "CounterParty" , "Security" , "Trade"]

for (let route of secretroutes) {
    let r = `/secret/${route.toLowerCase()}s`;
    app.get(r , async (req , res) => {
        let data = await orm_1.default.models[route].findAll();
        res.json(data);
    });

    let s = `/tsecret/${route.toLowerCase()}s`;
    app.get(s , async (req , res) => {
        let data = await orm_1.default.models[route].findAll();
        let html = html_tablify.tablify(data);
        res.send(html);
    });
}





const authorizationMiddleware = require("./auth");
const router = express.Router();
const controller = require("./controller");

const {
    allusers , allmanagers , register , userSpecificBooks , deleteuser , allbooks, settledTrades , 
    tradesByBooks , tradesByBooksid , preMaturity , postMaturity, redFlags, complianceFlags, accountingFlags
} = require("./controller");

const manager_only = authorizationMiddleware.authorizeRoles(["Manager"]);

router.route("/users").get(allusers);
router.route("/managers").get(allmanagers);
router.route("/books").get(allbooks);
router.route("/create").post(register);
router.route("/delete").delete(deleteuser);
router.route("/userbonds").get(userSpecificBooks);
router.route("/settledtrade").get(settledTrades);
router.route("/booktrade").get(tradesByBooks);
router.route("/booktradeid").get(tradesByBooksid);
router.route("/preMaturity").get(preMaturity);
router.route("/postMaturity").get(postMaturity);
router.route("/redFlags").get(redFlags);
router.route("/complianceFlags").get(complianceFlags);
router.route("/accountingFlags").get(accountingFlags);

app.use("/api/v1", router);


const port = parseInt(process.env.PORT) || 8000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});