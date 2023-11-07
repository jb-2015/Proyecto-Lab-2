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

const crear = async (id_orden,fecha_recoleccion,entregado,id_guiaM)=>{
    const nuevaMuestra= {
      id_orden: id_orden,
      fecha_recoleccion:fecha_recoleccion,
      entregado: entregado,
      id_guiaM:id_guiaM
    }
    Muestra.create(nuevaMuestra)
}

module.exports = {
  list,
  getById,
  crear
};
