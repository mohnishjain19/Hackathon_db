const sequelize = require("./orm");
const authorizer = require("./auth");

exports.allusers = async (req, res, next) => {
    try {
        const users = await sequelize.models.User.findAll(
            {
                where: {
                    role: 'user'
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
            }
        });

        //Get all book Ids 
        const bookIds = bookuserInstances.map(bookuserInstance => bookuserInstance.BookId);

        //Get all booknames 
        const bookNames = await sequelize.models.Book.findAll({
            where: {
                id: bookIds
            }
        });

        res.json(bookNames);
    }
    catch(err){
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

exports.deleteuser = async ( req, res, next ) => {

    const Email = req.body.email;
    
    try {

        const user = await sequelize.models.User.findOne({
            where: {
                Email
            }
        });

        if (!user) {
            res.status(404).json({
                error: `User with email ${Email} not found`
            })
        }

        await sequelize.models.User.destroy({
            where: {
                Email
            }
        });

        res.json({
            message: `User with email ${Email} deleted successfully`,
            affectedRows : 1 
        });
    }

    catch {
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