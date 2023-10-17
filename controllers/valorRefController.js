const ValorRef  = require('../models/valor_ref');

const list = async (req, res) => {
  try {
    const valorRef = await ValorRef.findAll();
    res.json(valorRef);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const valorRef = await ValorRef.findByPk(id);
    if (valorRef) {
      res.json(valorRef);
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
