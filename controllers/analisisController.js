

const  Analisis  = require('../models/analisis');


const obtenerAnalisis = async (req, res) => {
  try {
    const analisis = await Analisis.findAll();
    res.json(analisis);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  obtenerAnalisis
};
