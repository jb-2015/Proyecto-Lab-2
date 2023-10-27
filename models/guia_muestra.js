const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const guia_muestra = sequelize.define('guia_muestra', {
  id_guiaM: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_analisis: {
    type: DataTypes.INTEGER,
    allowNull: false,
    
  },
  g_descripcion: {
      type: DataTypes.STRING(30),
      allowNull: false
  }
}, {
  timestamps:false,
  tableName:'guia_muestra',
});


module.exports = guia_muestra;
