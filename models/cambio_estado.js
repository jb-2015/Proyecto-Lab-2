const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CambioEstado = sequelize.define('CambioEstado', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  id_orden: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  id_examen: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  }
}, {
  timestamps:false,
  tableName:'cambio_estado',
});

module.exports = CambioEstado;

