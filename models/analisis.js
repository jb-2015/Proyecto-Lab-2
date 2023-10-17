const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Analisis = sequelize.define('Analisis', {
  id_analisis: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  disponible: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  tipo: {
    type: DataTypes.STRING(20),
    allowNull: true
  }

}, {
  timestamps:false,
  tableName:'analisis',
});

module.exports = Analisis;

