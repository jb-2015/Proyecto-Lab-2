

const  Analisis  = require('../models/analisis');
const GuiaMuestra = require('../models/guia_muestra')
const guiaMuestraController = require('../controllers/guiaMuestraController')


const obtenerAnalisis = async (callback) => {
  try {
    const analisis = await Analisis.findAll();
    callback(analisis)
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const buscarPorId= async (id,callback)=>{
  try{
    Analisis.findByPk(id)
    .then(async (analisis)=>{
      console.log('ANALISIS BUSCADO POR ID: '+ analisis)
      await guiaMuestraController.getByAnalisis(id,(muestras)=>{
        callback({OK:true,analisis: analisis,muestras:muestras})
      })
      
      
    })
  }catch(error){
    callback({OK: false, data: error})
  }
}

module.exports = {
  obtenerAnalisis,
  buscarPorId
};
