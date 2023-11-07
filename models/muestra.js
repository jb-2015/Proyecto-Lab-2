const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');



const Muestra = sequelize.define('muestra', {
  id_muestra: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_orden: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  fecha_recoleccion: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  },
  entregado: {
    type: DataTypes.TINYINT,
    allowNull: true,
    defaultValue: null
  },
  id_guiaM: {
    type: DataTypes.STRING(30),
    allowNull: true,
    defaultValue: null,
    collate: 'utf8mb4_spanish2_ci'
  }
}, {
  timestamps:false,
  tableName:'muestra',
});



module.exports = Muestra;
