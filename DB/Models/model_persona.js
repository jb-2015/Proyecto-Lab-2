import {DataTypes,Model} from 'sequelize'
import sequelize from '../manager-db'

class Persona extends Model {}

Persona.init(
    {
        id_persona: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, // Si es una clave primaria autoincremental
          },
          nombre: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          apellido: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          dni: {
            type: DataTypes.BIGINT,
          },
          fecha_nacimiento: {
            type: DataTypes.DATE,
          },
          genero: {
            type: DataTypes.STRING,
          },
          direccion: {
            type: DataTypes.STRING,
          },
          tel: {
            type: DataTypes.STRING,
          },
          email: {
            type: DataTypes.STRING,
          },

    },
    {
        sequelize,
        modelName: 'Persona',
      }
)

export default Persona