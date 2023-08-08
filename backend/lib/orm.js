"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const uuid_1 = require("uuid");
const Book = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    BookName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
};
const User = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Name: {
        //Varchar(255)
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Email: {
        //Varchar(255)
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    Role: {
        type: sequelize_1.DataTypes.ENUM('Manager', 'User'),
        allowNull: false
    },
    Token: {
        //Autogenerate during registration
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        defaultValue: () => (0, uuid_1.v4)().toString()
    }
};
const BookUser = {
    BookId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Book",
            key: "id"
        }
    },
    UserId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "User",
            key: "id"
        }
    }
};
const CounterParty = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Name: {
        defaultValue: "Unknown Corporation LLC",
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
};
const Security = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ISIN: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    CUSIP: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    Issuer: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    MaturityDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    Coupon: {
        //Decimal (5,2)
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    Type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    FaceValue: {
        //Decimal (12,2)
        type: sequelize_1.DataTypes.DECIMAL(12, 2),
    },
    Status: {
        type: sequelize_1.DataTypes.STRING,
    },
};
const Trade = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    BookId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Book",
            key: "id"
        }
    },
    CounterPartyId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "CounterParty",
            key: "id"
        }
    },
    SecurityId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "Security",
            key: "id"
        }
    },
    Quantity: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    Price: {
        //Decimal 10,2
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
    },
    Status: {
        type: sequelize_1.DataTypes.STRING,
    },
    Buy_Sell: {
        type: sequelize_1.DataTypes.ENUM('Buy', 'Sell'),
    },
    TradeDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    SettlementDate: {
        type: sequelize_1.DataTypes.DATE,
    },
};

const db_name = "db_hackathon";
const db_username = "aniruddh";
const db_password = "polo-sheath-battery-golf-cheek";
const db_host = "db-1.clq6r5hpitgr.eu-north-1.rds.amazonaws.com";
const db_port = 3306;
const db_dialect = "mysql";
const db_dialectOptions = {
    ssl: 'Amazon RDS'
};

const logger = require('./logger');
const sequelize = new sequelize_1.Sequelize(db_name,  
db_username, 
db_password, //password
{
    host: db_host,
    dialect: db_dialect,
    port: db_port,
    logging: logger.warn,
    dialectOptions: db_dialectOptions,
    pool: { idle: 30, max: 5, min: 1, acquire: 45 * 1000 },
});
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});
const options = {
    freezeTableName: true,
    paranoid: true,
    timestamps: true,
};
sequelize.define('Book', Book, options);
sequelize.define('User', User, options);
sequelize.define('BookUser', BookUser, options);
sequelize.define('CounterParty', CounterParty, options);
sequelize.define('Security', Security, options);
sequelize.define('Trade', Trade, options);
//Create the tables if they don't exist
sequelize.sync().catch((error) => {
    console.log("Error syncing database: ", error);
});
//Define foreign key relationships
sequelize.models.Book.belongsToMany(sequelize.models.User, { through: 'BookUser' });
sequelize.models.User.belongsToMany(sequelize.models.Book, { through: 'BookUser' });
sequelize.models.Trade.belongsTo(sequelize.models.Book);
sequelize.models.Trade.belongsTo(sequelize.models.CounterParty);
sequelize.models.Trade.belongsTo(sequelize.models.Security);

//Sync the models with the database
sequelize.sync({ alter: false }).then(() => {
    console.log("Database Synced");
}).catch((error) => {
    console.log("Error syncing database: ", error);
});
//Create user with g
exports.default = sequelize;
