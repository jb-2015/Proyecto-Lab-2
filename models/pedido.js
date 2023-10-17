const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Pedido = sequelize.define('pedido', {
  id_pedido: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_persona: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  diagnostico: {
    type: DataTypes.STRING(200),
    allowNull: true,
    defaultValue: null,
    collate: 'utf8mb4_spanish2_ci'
  },
  nombre_medico: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null,
    collate: 'utf8mb4_spanish2_ci'
  },
  nro_matricula: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  }
}, {
  tableName: 'pedido',
  timestamps: false,
});
//Pedido.belongsTo(Persona, { foreignKey: 'id_persona', as: 'persona' });





module.exports = Pedido;
