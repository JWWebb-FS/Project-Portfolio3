const path = require('path');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const storage = process.env.DATABASE_STORAGE || path.join(__dirname, '..', 'database.sqlite');

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT || 'sqlite',
  storage,
  logging: false,
});

module.exports = { sequelize, Sequelize };
