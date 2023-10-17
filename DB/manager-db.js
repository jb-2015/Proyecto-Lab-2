import {dev} from "./config-db"
import Sequelize from "sequelize"

import Persona from './Models/model_persona.js'


const sequelize = new Sequelize(dev.database,dev.user,dev.password)


function crearPersona(person){
    Persona.create(person)
    .then(p=>{
        console.log("Persona creada:" + person.toJSON())
    })
    .catch(error=>{
        console.log("Error al crear persona: "+error)
    })

}
function consultarPersona(dni_p){
    Persona.findAll({
        where:{
            dni: dni_p
        }
    }) 
    .then(p=>{
        if(p.length>0){
            console.log('Persona encontrada:')
            
            p.forEach(per=>{
                console.log(per.toJSON())
            })
            return p
        }
        else{
            console.log("No se encontro persona con ese dato")
        }
    })
    .catch(error=>{
        console.log('')
    })
}

export default sequelize