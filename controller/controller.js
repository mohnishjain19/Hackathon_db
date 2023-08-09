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
        const sql = "SELECT Book.BookName,Book.Id FROM bookuser JOIN Book ON Book.Id = BookUser.BookId WHERE UserId = ?";
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


// See all settled trades
exports.settledTrades = async (req, res, next) => {
    try {
        let sql = `SELECT
                t.Id AS TradeId,
                b.BookName,
                c.Name AS CounterpartyName,
                s.ISIN,
                s.CUSIP,
                s.Issuer,
                t.Quantity,
                t.Status,
                t.Price,
                t.Buy_Sell,
                t.TradeDate,
                t.SettlementDate
            FROM
                Trade t
            JOIN
                Book b ON t.BookId = b.Id
            JOIN
                Counterparty c ON t.CounterpartyId = c.Id
            JOIN
                Security s ON t.SecurityId = s.Id
            WHERE
                t.Status = 'Completed'
            ORDER BY
                t.TradeDate;
            `;
            connection.query(sql,function(err,results){
                if(err)throw err;
                res.send(results);
            })
        
    }catch (err) {
        if (err) console.log(err);
    }
}



// Display trades for every book
exports.tradesByBooks = async (req, res, next) => {
    try {
            let sql = `SELECT
            b.BookName,
            t.Id AS TradeId,
            c.Name AS CounterpartyName,
            s.ISIN,
            t.Quantity,
            t.Status,
            t.Price,
            t.Buy_Sell,
            t.TradeDate,
            t.SettlementDate
        FROM
            Trade t
        JOIN
            Book b ON t.BookId = b.Id
        JOIN
            Counterparty c ON t.CounterpartyId = c.Id
        JOIN
            Security s ON t.SecurityId = s.Id
        ORDER BY
            b.BookName,
            t.TradeDate;        
            `
            connection.query(sql,function(err,results){
                if(err)throw err;
                res.send(results);
            })
    } catch(error) {
        console.log(error);
    }
}

//Pre Maturity 
exports.preMaturity = async (req, res, next) => {
    try {
        let sql = `SELECT trade.*, maturitydate 
                   FROM trade 
                   JOIN security ON trade.securityid = security.id 
                   WHERE MONTH(security.maturitydate) > 7 AND 
                         MONTH(security.maturitydate) < 10 AND 
                         security.maturitydate > CURRENT_DATE`;
        
        connection.query(sql, function(err, results) {
            if (err) throw err;
            res.send(results);
        });
    } catch (err) {
        if (err) console.log(err);
    }
}


// post maturity date trades (the ones which have bonds that have already matured)
exports.postMaturiy = async (req, res, next) => {
    try {
        let sql = `select trade.*, maturitydate 
                from trade join security 
                on trade.securityid=security.id 
                where security.maturitydate<CURRENT_DATE and 
                settlementdate is NULL;`;
            connection.query(sql,function(err,results){
                if(err)throw err;
                res.send(results);
            })
        
    }catch (err) {
        if (err) console.log(err);
    }
}


// display trade from specific book_id
exports.tradesByBooksid = async (req, res, next) => {
    try {
        let bookId = req.query.id;
        console.log("req.query.bookId: ",req.query.id);
        let sql = `
            SELECT
                b.Id AS BookId,
                b.BookName,
                t.Id AS TradeId,
                c.Name AS CounterpartyName,
                s.ISIN,
                s.CUSIP,
                s.Issuer,
                t.Quantity,
                t.Status,
                t.Price,
                t.Buy_Sell,
                t.TradeDate,
                t.SettlementDate
            FROM
                Trade t
            JOIN
                Book b ON t.BookId = b.Id
            JOIN
                Counterparty c ON t.CounterpartyId = c.Id
            JOIN
                Security s ON t.SecurityId = s.Id
            WHERE
                t.BookId = ?
            ORDER BY
                b.BookName,
                t.TradeDate;        
        `;

        connection.query(sql, [bookId], function(err, results) {
            if (err) throw err;
            res.send(results);
        });
    } catch (error) {
        console.log(error);
    }
};

// Add Book User
exports.addBookUser = async (req, res, next) => {
    try {
      const { bookId, userId } = req.body;
  
      // Check if the user exists
      const userQuery = 'SELECT * FROM user WHERE Id = ?';
      connection.query(userQuery, [userId], (userErr, userResults) => {
        if (userErr) {
          console.error('Error checking user:', userErr);
          return res.status(500).json({ error: 'Error checking user' });
        } else if (userResults.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        // Check if the book exists
        const bookQuery = 'SELECT * FROM Book WHERE Id = ?';
        connection.query(bookQuery, [bookId], (bookErr, bookResults) => {
          if (bookErr) {
            console.error('Error checking book:', bookErr);
            return res.status(500).json({ error: 'Error checking book' });
          } else if (bookResults.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
          }
  
          // Check if the book user already exists
          const existingBookUserQuery = 'SELECT * FROM BookUser WHERE BookId = ? AND UserId = ?';
          connection.query(existingBookUserQuery, [bookId, userId], (existingErr, existingResults) => {
            if (existingErr) {
              console.error('Error checking existing book user:', existingErr);
              return res.status(500).json({ error: 'Error checking existing book user' });
            } else if (existingResults.length > 0) {
              return res.status(409).json({ message: 'Book user already exists' });
            }
  
            // Insert the book user
            const insertQuery = 'INSERT INTO BookUser (BookId, UserId) VALUES (?, ?)';
            const values = [bookId, userId];
            connection.query(insertQuery, values, (insertErr, insertResult) => {
              if (insertErr) {
                console.error('Error adding book user:', insertErr);
                return res.status(500).json({ error: 'Error adding book user' });
              }
              console.log('Book user added successfully');
              return res.status(200).json({
                message: 'Book user added successfully',
                insertResult,
              });
            });
          });
        });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred' });
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
