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
        console.error(err);
        res.status(500).send("Internal Server Error");
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
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

exports.register = async (req, res, next) => {

    const Name = req.body.name;
    const Email = req.body.email;
    const Role = req.body.role;

    console.log(Role);

    if (!authorizer.roles.includes(Role)) {
        res.status(401).json({
            error:`Role :${Role} is not allowed to access this resource`
        })
    }

    try {
        const user = await sequelize.models.User.create({
            Name,
            Email,
            Role
        });
        res.json(user);
    }

    catch(err){
        console.error(err);
        res.status(500).send("Internal Server Error");
    }

}

exports.userSpecificBooks = async (req, res, next) => {
    const UserId = req.body.userid;
    try {
        const user = await sequelize.models.User.findByPk(UserId);
        if (!user) {
            res.status(404).json({
                error: `User with id ${UserId} not found`
            })
        }

        //Get all bookuser instances for this user 
        const bookuserInstances = await sequelize.models.BookUser.findAll({
            where: {
                UserId : UserId
            },
            include : sequelize.models.Book

        });

        const bookNames = bookuserInstances.map( (bookuserInstance) => {
            return bookuserInstance.Book.BookName;
        });

        res.json(bookNames);
    }
    catch(err){
        console.error(err);
        res.status(500).send("Internal Server Error");
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
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

exports.allbooks = async (req, res, next ) => {

    //Return all books as json 
    try {
        const books = await sequelize.models.Book.findAll();
        res.json(books);
    }
    catch(err){
        console.error(err);
        res.status(500).send("Internal Server Error");
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
        console.error(err);
        res.status(500).send("Internal Server Error");
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
        console.error(err);
        res.status(500).send("Internal Server Error");
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
        console.error(err);
        res.status(500).send("Internal Server Error");
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
        console.error(err);
        res.status(500).send("Internal Server Error");

    }
}

// display trade from specific book_id
exports.tradesByBooksid = async (req, res, next) => {

    try {
        const bookId = req.body.bookid;
        const trades = await sequelize.models.Trade.findAll({
            include : [
                {
                    model : sequelize.models.Book,
                    where : {
                        id : bookId
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
    catch {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }

}

exports.redFlags = async (req, res, next) => {

    try{
        //Existing trades where either the settlement date is null and maturity date has passed 
        //Or the settlement date has passed 
        //Note settlement date is in trades, 
        //While maturity date is in securities
        //Both are separate tables joined by foreign key Trade.SecurityId = Security.id

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

        res.json(trades);

    }
    
    catch (err){
        console.error(err);
        res.status(500).send("Internal Server Error");

    }

}