"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//console.log("Running")
const express = require("express");
const orm_1 = require("./orm");
const path_1 = require("path");
const html_tablify = require("html-tablify");
// create and setup express app
const app = express();
//JSON stuff
app.use(express.json());




function checkUserMiddleware(req, res, next) {
    //Check if user is logged in
    //If not, redirect to login page
    //If so, continue
    let user_id = req.body.user_id;
    let token = req.body.token;
    if (checkUser(user_id, token)) {
        next();
    }
    else {
        res.redirect("/login");
    }
}


async function checkUser(user_id, token = null) {
    //Get user from orm using user_id 
    let user = await orm_1.default.models.User.findOne({ where: { id: user_id } });
    if (user == null || token == null) {
        return false;
    }
    if (user.Token == token) {
        return true;
    }
    return false;
}

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
    const newSecurity = await orm_1.default.models.Security.create({Id,Status, ISIN, CUSIP , Issuer, MaturityDate, Coupon, Type, FaceValue });
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
}


app.get("/", async (_req, res) => {
    //Render ../public/homepage.html
    let path = (0, path_1.resolve)(__dirname + "/../public/homepage.html");
    res.sendFile(path);
});



// start express server
app.listen(8000);
console.log("Started Running Application");
