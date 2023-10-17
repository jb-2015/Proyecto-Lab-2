const  CambioEstado  = require('../models/cambio_estado');


const obtenerCE = async (req, res) => {
  try {
    const cambioesta = await CambioEstado.findAll();
    res.json(cambioesta);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
    obtenerCE
};