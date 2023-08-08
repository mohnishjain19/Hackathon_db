const app=require("./app");
const dotenv=require("dotenv");
const connectDatabase=require("./config/database");


process.on("uncaught Exception",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    process.exit(1);
});

dotenv.config({path:"config/config.env"});


const server=app.listen(process.env.PORT,()=>{

    console.log(`Server is running on http://localhost:${process.env.PORT}`);
    connectDatabase.connect(function(err){

        if(err)throw err;
        console.log("Database Connected"); 
    })
});

 
//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    // console.log('Error: ${err.message}`);
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    server.close(()=>{
        process.exit(1);
    });
});
