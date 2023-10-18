// models/persona.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Persona = sequelize.define('Persona', {
  id_persona: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(30), // Ajustado a la longitud de la columna en la base de datos
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING(30), // Ajustado a la longitud de la columna en la base de datos
    allowNull: false,
  },
  dni: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  fecha_nacimient: {
    type: DataTypes.DATEONLY, // Tipo de dato para almacenar solo la fecha sin hora
    allowNull: true,
  },
  genero: {
    type: DataTypes.CHAR(1),
    allowNull: true,
  },
  direccion: {
    type: DataTypes.STRING(100), 
    allowNull: true,
  },
  tel: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(70),
    allowNull: true,
  },
}, {
  tableName: 'persona',
  timestamps: false,
});

module.exports = Persona;

  