const connection=require("../config/database");



exports.allusers =async(req,res,next)=>
{
    try
    {
        let sql = "Select * from user";
        connection.query(sql,function(err,results){
            if(err)throw err;
            res.send(results);
        })
    }
    catch(error)
    {
        console.log(error);
    }

}
