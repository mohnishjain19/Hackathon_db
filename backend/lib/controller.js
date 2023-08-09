const orm = require("./orm");
const authorizer = require("./auth");
const { QueryTypes , Op } = require('sequelize');

const sequelize = orm.default; 

exports.allusers = async (req, res, next) => {
    try {
        const users = await sequelize.models.User.findAll(
            {
                where: {
                    role: 'User'
                }
            }
        );
        res.json(users);

    }
    catch(err){
        console.error(err , err.stack);
        res.status(500).send({error : "Internal Server Error"});
    }
}

exports.allmanagers = async (req, res, next) => {
    try {
        const managers = await sequelize.models.User.findAll(
            {
                where: {
                    role: 'manager'
                }
            }
        );
        res.json(managers);

    }
    catch(err){
        console.error(err , err.stack);
        res.status(500).send({error : "Internal Server Error"});
    }
}

exports.register = async (req, res, next) => {

    const Name = req.body.name;
    const Email = req.body.email;
    const Role = req.body.role;

    // console.log(Role);

    if (!authorizer.roles.includes(Role)) {
        res.status(401).json({
            error:`Role :${Role} is not allowed to access this resource`
        })
    }

    try {

        //Check if user with email exists 
        const userExists = await sequelize.models.User.findAndCountAll({
            where : {
                Email : Email
            }
        });

        if (userExists.count > 0 ) {
            res.status(400).json({
                error: `User with email ${Email} already exists`
            });
            return;
        }

        let user = await sequelize.models.User.create({
            Name,
            Email,
            Role
        });

        user = {
            data: user, 
            message : "User created successfully"
        };

        res.json(user);
    }

    catch(err){
        console.error(err , err.stack);
        res.status(500).send({error : "Internal Server Error"});
    }

}

exports.userSpecificBooks = async (req, res, next) => {
    
    
    try {

        let UserId = req.query.id;

        try  {
            UserId = parseInt(UserId);
        }
        
        catch(err) {
            res.status(400).json({
                error: `Invalid User Id ${UserId}: Error: ${err}`
            });
            return; 
        }

        if (typeof UserId !== "number"){
            res.status(400).json({
                error: `Invalid User Id ${UserId}`
            });
            return;
        }

        //Find all the bookUserInstances where the user is present 
        const bookUserInstances = await sequelize.models.BookUser.findAll(
            {
                where: {
                    UserId: UserId || -1
                }
        });

        const bookIds = bookUserInstances.map(x => x.BookId);
        const books = await sequelize.models.Book.findAll({
            where: {
                id: {
                    [Op.in]: bookIds
                }
            }
        });

        const bookNames = books.map(x => x.BookName);
        res.json(bookNames);
    }
    catch(err){
        console.error(err , err.stack);
        res.status(500).send({error : "Internal Server Error"});
    }
}

exports.deleteuser = async ( req, res, next ) => {

    const EMail = req.body.email;
    
    try {


        const user = await sequelize.query(
            "Select count(*) from User where Email = ?", 
            {
                replacements: [EMail],
                type: QueryTypes.SELECT
              }
        );

        if (user[0]['count(*)'] == 0) {
            res.status(404).json({
                error: `User with email ${EMail} not found`
            })
        }

        await sequelize.query(
            "Delete from User where Email = ?",
            {
                replacements: [EMail],
                type: QueryTypes.DELETE
            }
        );

        res.json({
            message: `User with email ${EMail} deleted successfully`,
            affectedRows : 1 
        });
    }

    catch(err) {
        console.error(err , err.stack);
        res.status(500).send({error : "Internal Server Error"});
    }
}

exports.allbooks = async (req, res, next ) => {

    //Return all books as json 
    try {
        const books = await sequelize.models.Book.findAll();
        res.json(books);
    }
    catch(err){
        console.error(err , err.stack);
        res.status(500).send({error : "Internal Server Error"});
    }
}

exports.settledTrades = async (req, res, next) => {

    try {
        const settledTrades = await sequelize.models.Trade.findAll({
            where: {
                Status : "Completed"
            },
            include : [
                {
                    model : sequelize.models.Book,
                },
                {
                    model : sequelize.models.CounterParty,
                },
                {
                    model : sequelize.models.Security,
                }
            ]
        });

        res.json(settledTrades);
    }

    catch(err){
        console.error(err , err.stack);
        res.status(500).send({error : "Internal Server Error"});
    }
}

exports.tradesByBooks = async (req, res, next) => {
    //Return all trades with their corresponding books, securities and counterparties 

    try {
        let trades = await sequelize.models.Trade.findAll({
            include : [
                {
                    model : sequelize.models.Book,
                },
                {
                    model : sequelize.models.CounterParty,
                },
                {
                    model : sequelize.models.Security,
                }
            ]
        });

        res.json(trades);
    }
    catch (err) {
        console.error(err , err.stack);
        res.status(500).send({error : "Internal Server Error"});
    }

}

exports.preMaturity = async (req, res , next ) => {

    try {
        //Find trades with security maturity date <= 1 month after today 
        //Trade is linked with security via foreign key SecurityId
        //Security has maturity date

        const trades = await sequelize.models.Trade.findAll({
            include : [
                {
                    model : sequelize.models.Security,
                    where : {
                        MaturityDate : {
                            [Op.lte] : sequelize.literal('DATE_ADD(CURDATE(), INTERVAL 1 MONTH)'),
                            [Op.gte] : sequelize.literal('CURDATE()')
                        }
                    }
                },
                {
                    model : sequelize.models.CounterParty,
                },
                {
                    model : sequelize.models.Book,
                }
            ]
        });
        
        res.json(trades);

    }
    catch(err) {
        console.error(err , err.stack);
        res.status(500).send({error : "Internal Server Error"});
    }
}

exports.postMaturity = async (req, res ,next) => {
    //Return Trades post maturity 
    try {
        //Maturity Date <= Current Date
        const trades = await sequelize.models.Trade.findAll({
            include : [
                {
                    model : sequelize.models.Security,
                    where : {
                        MaturityDate : {
                            [Op.lte] : sequelize.literal('CURDATE()')
                        }
                    }
                }, 
                {
                    model : sequelize.models.CounterParty,
                },
                {
                    model : sequelize.models.Book,
                }
            ]
        });

        res.json(trades);
    }
    catch(err){
        console.error(err , err.stack);
        res.status(500).send({error : "Internal Server Error"});

    }
}

// display trade from specific book_id
exports.tradesByBooksid = async (req, res, next) => {

    try {
        const bookId = parseInt(req.query.id);
        const trades = await sequelize.models.Trade.findAll({
            include : [
                {
                    model : sequelize.models.Book,
                    where : {
                        id : bookId || -1
                    }
                }, {
                    model : sequelize.models.CounterParty,
                },
                {
                    model : sequelize.models.Security,
                }
            ]
        });

        res.json(trades);
    }
    catch (error){
        console.error(error, error.stack);
        res.status(500).send({error : "Internal Server Error"});
    }


}

exports.addBookUser = async (req, res, next) => {
    try {
        const {bookId, userId} = req.body; 

        if (!bookId ){
            res.status(401).send({error : "bookId cannot be null"});
            return; 
        }

        if (!userId){
            res.status(401).send({error : "userId cannot be null"});
            return; 
        }

        //Check if bookId exists 
        const book = await sequelize.models.Book.findAndCountAll(
            {
                where: {
                    id : bookId
                }
            }
        );

        if (book.count == 0 ){
            res.status(400).json({
                success : false, 
                error : `Book with ID ${bookId} does not exist`
            });
            return; 
        }

        const tuser = await sequelize.models.User.findAndCountAll({
            where : {
                id : userId
            }
        });

        if (tuser.count == 0 ){
            res.status(400).json({
                success : false, 
                error : `User with ID ${userId} does not exist`
            });
            return;             
        }

        const [existing_user, user] = await sequelize.models.BookUser.findOrCreate(
            {
                where : {
                    BookId : bookId, 
                    userId : userId
                }
            }
        );

        if (existing_user){
            res.json({
                success : true, 
                message : "User already exists",
                data : existing_user
            });

            return; 
        }

        else if (user){
            res.json({
                success : true, 
                message : "User created",
                data : user 
            });

            return; 
        }

    }


    catch (err){
        console.log(err , err.stack);
        res.status(501).send({error : "Internal Server Error"});
    }
}

async function getAccountingFlags(){

    //For 
    const trades = await sequelize.models.Trade.findAll({
    include : [
        {
            model : sequelize.models.CounterParty,
        },
        {
            model : sequelize.models.Security,
        },
        {
            model : sequelize.models.Book,
        }
    ],
    where : {
        [Op.or] : [{
            [Op.and] : [{
                SettlementDate : null
            }, {
                //Maturity Date
                '$Security.MaturityDate$' : {
                    [Op.lte] : sequelize.literal('CURDATE()')
                }

            }]
        },
        {
            SettlementDate : {
                [Op.lte] : sequelize.literal('CURDATE()')
            }
        }]
    }

    });

    return trades; 
}

async function getComplianceFlags(){

    //For maturity date > settlement date 
    //These are compliance flags, which mean the bond is incorrect 
    //And needs to be corrected 

    const trades = await sequelize.models.Trade.findAll({
        include : [
            {
                model : sequelize.models.CounterParty,
            },
            {
                model : sequelize.models.Security,
            },
            {
                model : sequelize.models.Book,
            }
        ],

        where : {
            SettlementDate : {
                [Op.lt] : sequelize.col('Security.MaturityDate')
            }
        }

    });

    return trades;
}

exports.accountingFlags = async (req, res, next) => {
    try {
        const trades = await getAccountingFlags();
        res.json(trades);
    }
    catch (err) {
        console.error(err , err.stack);
        res.status(500).send({error : "Internal Server Error"});
    }
}

exports.complianceFlags = async (req, res, next) =>{
    try {
        const trades = await getComplianceFlags();
        res.json(trades);
    }
    catch (err){
        console.error(err , err.stack);
        res.status(500).send({error : "Internal Server Error"});
    }
}

async function getRedFlags(){
    let complianceItems = await getComplianceFlags();
    let accountingItems = await getAccountingFlags();

    //Check for instances in accounting flags that have occured in complianceFlags and filter them out 
    const complianceIds = complianceItems.map((x) => x.id);
    accountingItems = accountingItems.filter((x) => !complianceIds.includes(x.id));

    //Combine both arrays with an additional field flag_type 
    //Flag type is either accounting or compliance
    complianceItems = complianceItems.map((x) => {
        return {
            ...x.dataValues,
            flag_type : "compliance"
        }
    });

    accountingItems = accountingItems.map((x) => {
        return {
            ...x.dataValues,
            flag_type : "accounting"
        }
    });

    let trades = complianceItems.concat(accountingItems);
    return trades;
}

exports.red = async (req, res, next) =>{
    try 
    {let userId = req.query.userId; 

    if (!userId){
        res.status(400).json({
            success: false,
            message : `Invalid userId : ${userId}`
        });
        return; 
    }

    let books = await sequelize.models.BookUser.findAll({
        where : {
            UserId : userId
        }
    });

    if (!books){
        res.json([]);
        return; 
    }

    books = books.map(x => x.BookId);

    let trades = await getRedFlags();
    trades = trades.filter(x => books.includes(x.BookId) );
    res.json(trades);}
    catch(err){
        console.error(err, err.stack);
        res.status(501).send({error : "Internal Server Error"});
    }
}

exports.redFlags = async (req, res, next) => {

    try{
        //Existing trades where either the settlement date is null and maturity date has passed
        //Or the settlement date has passed
        //Note settlement date is in trades,
        //While maturity date is in securities
        //Both are separate tables joined by foreign key Trade.SecurityId = Security.id

        let bookid = req.body.bookid;
        let trades = await getRedFlags();

        if (bookid == null || bookid == undefined || bookid == "" ) {
        }
        //Check for bookid being an array 
        else if (Array.isArray(bookid)) {
            trades = trades.filter(trade => bookid.includes(trade.Book.id));
        }
        //Else single number 
        else if (typeof bookid === "number") {
            trades = trades.filter(trade => trade.Book.id == bookid);
        }

        res.json(trades);

    }

    catch (err){
        console.error(err , err.stack);
        res.status(500).send({error : "Internal Server Error"});

    }

}