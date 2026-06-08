// 1. Import DataTypes from 'sequelize' and the sequelize instance from '../config/database.js'
// 2. Define a model called 'AuthToken'
// 3. Add a column for 'token' (STRING, allowNull: false)
// 4. Add a column for 'expiresAt' (DATE, allowNull: false)
// 5. Export the AuthToken model
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const AuthToken = sequelize.define('AuthToken', {
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = AuthToken;