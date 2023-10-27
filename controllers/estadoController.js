const Estado  = require('../models/estado');

const list = async (callback) => {
  try {
    const estado = await Estado.findAll();
    callback(estado)
  } catch (error) {
    console.error
    //res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const estado = await Estado.findByPk(id);
    if (estado) {
      res.json(estado);
    } else {
      res.status(404).json({ error: 'Valor de referencia no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  list,
  getById,
};
