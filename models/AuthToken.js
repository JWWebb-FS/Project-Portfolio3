
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