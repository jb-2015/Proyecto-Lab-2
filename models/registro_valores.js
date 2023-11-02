const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Registro_valores = sequelize.define('registro_valores', {
  id_reg: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_determinacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    
  },
  id_examen: {
    type: DataTypes.INTEGER,
    allowNull: false,
    
    collate: 'utf8mb4_spanish2_ci'
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
   
    collate: 'utf8mb4_spanish2_ci'
  }
}, {
  tableName: 'registro_valores',
  timestamps: false,
});

module.exports = Registro_valores;
