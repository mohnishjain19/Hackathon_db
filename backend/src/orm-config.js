import {Sequelize, DataTypes} from 'sequelize';



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
    }
    
}

const BookUser = {
    BookId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: "Book",
        referencesKey: "id"
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
   'hackathon',
   'aniruddh',
   'polo-sheath-battery-golf-prudishly-bruising-cheek',
    {
      host: 'localhost',
      dialect: 'mysql'
    }
  );

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

sequelize.define('Book', Book);
sequelize.define('User', User);
sequelize.define('BookUser', BookUser);
sequelize.define('CounterParty', CounterParty);
sequelize.define('Security', Security);
sequelize.define('Trade', Trade);

//Define foreign key relationships
sequelize.models.Book.belongsToMany(sequelize.models.User, {through: 'BookUser'});
sequelize.models.User.belongsToMany(sequelize.models.Book, {through: 'BookUser'});
sequelize.models.Trade.belongsTo(sequelize.models.Book);
sequelize.models.Trade.belongsTo(sequelize.models.CounterParty);
sequelize.models.Trade.belongsTo(sequelize.models.Security);


export default sequelize;