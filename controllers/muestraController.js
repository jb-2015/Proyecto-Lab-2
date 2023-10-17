const Muestra  = require('../models/muestra');

const list = async (req, res) => {
  try {
    const muestra = await Muestra.findAll();
    res.json(muestra);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const muestra = await Muestra.findByPk(id);
    if (muestra) {
      res.json(muestra);
    } else {
      res.status(404).json({ error: 'Muestra no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  list,
  getById,
};
