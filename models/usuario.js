const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dni: {
    type: DataTypes.BIGINT,
    allowNull: true,
    defaultValue: null
  },
  clave: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null,
    collate: 'utf8mb4_spanish2_ci'
  },
  rol: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: null,
    collate: 'utf8mb4_spanish2_ci'
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: null
  }
}, {
  tableName: 'usuario',
  timestamps: false,
});

module.exports = Usuario;
