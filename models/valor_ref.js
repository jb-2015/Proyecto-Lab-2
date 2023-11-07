const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ValorRef = sequelize.define('ValorRef', {
  id_val_ref: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sexo: {
    type: DataTypes.CHAR(1),
    allowNull: true,
    defaultValue: null,
    collate: 'utf8mb4_spanish2_ci'
  },
  val_max: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: null
  },
  val_min: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: null
  },
  rango_edad: {
    type: DataTypes.STRING(5),
    allowNull: true,
    defaultValue: null,
    collate: 'utf8mb4_spanish2_ci'
  },
  id_determinacion: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },
}, {
  tableName: 'valor_ref',
  timestamps: false,
});

module.exports = ValorRef;
