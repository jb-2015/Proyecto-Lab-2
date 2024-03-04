const  CambioEstado  = require('../models/cambio_estado');

const eliminarCEPorId = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar la entrada por su id y eliminarla
    const cambioEstadoEliminado = await CambioEstado.destroy({
      where: {
        id: id
      }
    });

    if (cambioEstadoEliminado === 1) {
      res.status(200).json({ message: `La entrada con ID ${id} fue eliminada exitosamente` });
    } else {
      res.status(404).json({ error: `No se encontró ninguna entrada con ID ${id}` });
    }
  } catch (error) {
  
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const obtenerCE = async (req, res) => {
  try {
    const cambioesta = await CambioEstado.findAll();
    res.json(cambioesta);
  } catch (error) {
  
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const btnVerificar= async (req, res)=>{
  try{
    const id_orden = req.params.id_orden;
  
    const nuevoCambio= await CambioEstado.create({
      id_estado:3,
      id_orden:id_orden,
      fecha:new Date()
    })
  res.json(true)
  }catch(error){
    res.status(500).json({ error: 'Internal Server Error' });
    res.json(false)
  }
  
  }
  const btnValidar= async (req, res)=>{
    try{
      const id_orden = req.params.id_orden;
      const idE = req.params.idE;
      const nuevoCambio= await CambioEstado.create({
        id_estado:4,
        id_orden:id_orden,
        id_examen:idE,
        fecha:new Date()
      })
    res.json(true)
    }catch(error){
      res.status(500).json({ error: 'Internal Server Error' });
     // res.json(false)
    }
    
    }
    const newEstadoExa= async (req, res)=>{
      try{
         const estadoOrden = req.params.estadoOrden;
        const idOrden = req.params.idOrden;
        const idExa = req.params.idExa;
       
        const nuevoCambio= await CambioEstado.create({

          id_estado:estadoOrden,
          id_orden:idOrden,
          id_examen:idExa,
          fecha:new Date()
        })
      res.json(true)
      }catch(error){
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  
  module.exports = {
      obtenerCE,
      btnValidar,
      btnVerificar,
      eliminarCEPorId,
      newEstadoExa
  };