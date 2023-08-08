const orm = require("./orm");
const authorizer = require("./auth");

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

    if (!authorizer.roles.includes(Role)) {
        res.status(401).json({
            error:`Role :${Role} is not allowed to access this resource`
        })
    }

    try {
        const user = await sequelize.models.User.create({
            Name,
            Email,
            role: Role
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

    const EMail = req.body.EMail;
    
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