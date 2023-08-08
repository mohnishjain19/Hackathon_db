const express=require("express");
const app=express();
var bodyParser=require("body-parser");
const dotenv=require("dotenv");
var cors=require("cors");
const cookieParser =require("cookie-parser");
const route=require("./routes/route")



app.use(cors());
app.use(cookieParser());
app.use(express.json());
dotenv.config({path:"config/config.env"});
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));;

app.use("/api/v1",route);



module.exports=app;

