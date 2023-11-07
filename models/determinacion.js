const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Determinacion = sequelize.define('determinacion', {
  id_determinacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_analisis: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: null
  },
  unidad_medida: {
    type: DataTypes.STRING(15),
    allowNull: true,
    defaultValue: null,
    collate: 'utf8mb4_spanish2_ci'
  },
  nombre: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: null,
    collate: 'utf8mb4_spanish2_ci'
  }
}, {
  timestamps:false,
  tableName:'determinacion',
});

module.exports = Determinacion;


  