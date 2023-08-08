const connection=require("../config/database");


//Fetch All Users
exports.allusers =async(req,res,next)=>
{
    try
    {
        const roleToFetch = 'user';
        const sql = `SELECT * FROM user WHERE role = ?`;

        connection.query(sql, [roleToFetch],function(err,results){
            if(err)throw err;
            res.send(results);
        })
    }
    catch(error)
    {
        console.log(error);
    }

}

// Fetch all managers
exports.allmanagers =async(req,res,next)=>
{
    try
    {
        const roleToFetch = 'manager';
        const sql = `SELECT * FROM user WHERE role = ?`;

        connection.query(sql, [roleToFetch],function(err,results){
            if(err)throw err;
            res.send(results);
        })
    }
    catch(error)
    {
        console.log(error);
    }

}


//Register user or manager
exports.register = async (req, res, next) => {
    try {
        const name = req.body.name; 
        const email = req.body.email; 
        const role = req.body.role;
        
        const sql = "INSERT INTO `user` (`Name`, `Email`, `Role`) VALUES (?, ?, ?)";
        connection.query(sql, [name, email, role], function(err, results) {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Database error' }); 
            }
            res.status(200).json({ 
                message: 'User registered successfully', 
                results
            });
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error' });
    }
};


// User specific books
exports.userSpecificBooks = async (req, res, next) => {
    try {
        const userid = req.body.userid; // Corrected variable name
        
        // Using placeholders in the SQL query to prevent SQL injection
        const sql = "SELECT Book.BookName FROM bookuser JOIN Book ON Book.Id = BookUser.BookId WHERE UserId = ?";
        connection.query(sql, [userid], function(err, results) {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Database error' }); 
            }
            res.status(200).json({ 
                message: 'User specific books displayed successfully', 
                results
            });
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error' });
    }
};


//Delete User
exports.deleteuser = async (req, res, next) => {
    try {
        const email = req.body.email;
        const sql = "DELETE FROM user WHERE email= ?";
        
        connection.query(sql, [email], function(err, results) {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Database error' }); 
            }
            
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json({ 
                message: 'User deleted successfully', 
                affectedRows: results.affectedRows
            });
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error' });
    }
};



// Fetch All Books
exports.allbooks =async(req,res,next)=>
{
    try
    {
        let sql = "Select * from book";
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
