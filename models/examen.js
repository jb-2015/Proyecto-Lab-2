const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');



const Examen = sequelize.define('examen', {
  id_examen: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_orden: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  descripcion: {
    type: DataTypes.STRING(200),
    allowNull: true,
    defaultValue: null,
    collate: 'utf8mb4_spanish2_ci'
  },
  resultado: {
    type: DataTypes.STRING(10),
    allowNull: true,
    defaultValue: null,
    collate: 'utf8mb4_spanish2_ci'
  },
  fecha_resultado: {
    type: DataTypes.DATE,
    allowNull: true
  },
  
  id_analisis:{
      type: DataTypes.INTEGER,
      allowNull:false
    }
  
}, {
  tableName: 'examen',
  timestamps: false,
});




module.exports = Examen;


