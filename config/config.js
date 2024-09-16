require('dotenv').config(); // Load environment variables from .env

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.PASSWORD, {
  host: process.env.HOST_NAME,
  dialect: process.env.DIALECT,
});

module.exports = sequelize;
