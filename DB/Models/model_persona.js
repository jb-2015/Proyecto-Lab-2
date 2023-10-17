import {DataTypes,Model} from 'sequelize'
import sequelize from '../manager-db'

class Persona extends Model {}

Persona.init(
    {
        id_persona :{
            type:DataTypes.STRING,
            allowNull: false
        },
        nombre:{
            type:DataTypes.STRING,
            allowNull: false
        },
        apellido:{
            type: DataTypes.STRING,
            allowNull:false
        },
        dni:{
            type:DataTypes.BIGINT,
            allowNull:false
        },
        fecha_nacimiento: {
            type: DataTypes.DATE,
            allowNull: false
        }

    },
    {
        sequelize,
        modelName: 'persona',
      }
)