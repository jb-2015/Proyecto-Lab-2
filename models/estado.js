const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Estado = sequelize.define('estado', {
  id_estado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(30),
    allowNull: true,
    defaultValue: null,
    collate: 'utf8mb4_0900_ai_ci'
  }
}, {
  timestamps:false,
  tableName:'estado',
});


module.exports = Estado;
