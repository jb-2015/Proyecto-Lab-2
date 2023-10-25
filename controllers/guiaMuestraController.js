const Guia_muestra  = require('../models/guia_muestra');
const Analisis= require('../models/analisis')


const buscarPorAnalisis= async (req,res)=>{
    const {id} = req.params
    try{
        const list_muestra= await Guia_muestra.findAll({
            attributes: ['g_descripcion'],
            where:{
                id_analisis: id
            }

        })
        res.json(list_muestra)
    }
    catch(error){
        console.error("Error al realizar la consulta: "+error)
    }
}







module.exports = {
  buscarPorAnalisis
};
