import {Sequelize, DataTypes} from 'sequelize';
import { v4 as uuidv4 } from 'uuid';



const Book = {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    BookName : {
        type: DataTypes.STRING,
        allowNull: false
    }
}

const User = {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Name : {
        //Varchar(255)
        type: DataTypes.STRING,
        allowNull: false
    },
    Email : {
        //Varchar(255)
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    Role : {
        type : DataTypes.ENUM('Manager', 'User'),
        allowNull: false
    },
    Token : {
        //Autogenerate during registration
        type: DataTypes.STRING,
        unique: true,
        defaultValue: () => uuidv4().toString()
    }
}

const BookUser = {
    BookId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Book",
            key: "id"
        }
    },
    UserId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "User",
            key: "id"
        }
    }
}

const CounterParty = {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Name : {
        defaultValue: "Unknown Corporation LLC",
        type: DataTypes.STRING,
        allowNull: false,
    }
}

const Security = {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ISIN : {
        type: DataTypes.STRING,
        unique : true,
        allowNull: false,

    },
    CUSIP : {
        type: DataTypes.STRING,
        unique : true,
        allowNull: false,
    },
    Issuer : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    MaturityDate : {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Coupon : {
        //Decimal (5,2)
        type: DataTypes.DECIMAL(5,2),
        allowNull: false,
    },
    Type : {
        type : DataTypes.STRING,
        allowNull: false,
    },
    FaceValue : {
        //Decimal (12,2)
        type : DataTypes.DECIMAL(12,2),
    },
    Status  : {
        type : DataTypes.STRING,
    },
}

const Trade = {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    BookId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Book",
            key: "id"
        }
    },
    CounterPartyId : {
        type: DataTypes.INTEGER,
        references: {
            model: "CounterParty",
            key: "id"
        }
    },
    SecurityId : {
        type: DataTypes.INTEGER,
        references: {
            model : "Security",
            key : "id"
        }
    },
    Quantity : {
        type : DataTypes.INTEGER,
    },
    Price:  {
        //Decimal 10,2
        type : DataTypes.DECIMAL(10,2),
    },
    Status : {
        type : DataTypes.STRING,
    },
    Buy_Sell : {
        type : DataTypes.ENUM('Buy', 'Sell'),
    },
    TradeDate : {
        type  : DataTypes.DATE,
    },
    SettlementDate : {
        type : DataTypes.DATE,
    },
}

const sequelize = new Sequelize(
   'db_hackathon', //database name 
   'aniruddh', //username
   'polo-sheath-battery-golf-cheek', //password
    { 
      host: 'db-1.clq6r5hpitgr.eu-north-1.rds.amazonaws.com', //database host
      dialect: 'mysql', //database dialect
      port : 3306,
      logging: console.log,
    dialectOptions: {
        ssl:'Amazon RDS'
    },
    pool: { idle: 30, max: 5 , min : 1 , acquire: 45*1000 },  
    }
);

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

const options = {
    freezeTableName: true,
    paranoid : true,
    timestamps : true,
};


sequelize.define('Book', Book , options);
sequelize.define('User', User, options);
sequelize.define('BookUser', BookUser , options);
sequelize.define('CounterParty', CounterParty, options);
sequelize.define('Security', Security, options);
sequelize.define('Trade', Trade, options);

//Create the tables if they don't exist
sequelize.sync().catch((error) => {
    console.log("Error syncing database: ", error);
});


//Define foreign key relationships
sequelize.models.Book.belongsToMany(sequelize.models.User, {through: 'BookUser'});
sequelize.models.User.belongsToMany(sequelize.models.Book, {through: 'BookUser'});
sequelize.models.Trade.belongsTo(sequelize.models.Book);
sequelize.models.Trade.belongsTo(sequelize.models.CounterParty);
sequelize.models.Trade.belongsTo(sequelize.models.Security);


//Sync the models with the database
sequelize.sync({alter: true}).then(() => {
    console.log("Database Synced");
}).catch((error) => {
    console.log("Error syncing database: ", error);
});

//Create user with g


export default sequelize;