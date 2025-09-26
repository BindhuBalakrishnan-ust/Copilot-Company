const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.SQL_DATABASE, process.env.SQL_USER, process.env.SQL_PASSWORD, {
    host: process.env.SQL_SERVER,
    dialect: 'mssql',
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to Azure SQL Database.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
