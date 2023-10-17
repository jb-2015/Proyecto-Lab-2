const Determinacion  = require('../models/determinacion');

const list = async (req, res) => {
  try {
    const deter = await Determinacion.findAll();
    res.json(deter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const deter = await Determinacion.findByPk(id);
    if (deter) {
      res.json(deter);
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
