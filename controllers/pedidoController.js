const Pedido  = require('../models/pedido');

const list = async (req, res) => {
  try {
    const pedido = await Pedido.findAll();
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const pedido = await Pedido.findByPk(id);
    if (pedido) {
      res.json(pedido);
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
