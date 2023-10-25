

const  Analisis  = require('../models/analisis');


const obtenerAnalisis = async (callback) => {
  try {
    const analisis = await Analisis.findAll();
    callback(analisis)
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  obtenerAnalisis
};
