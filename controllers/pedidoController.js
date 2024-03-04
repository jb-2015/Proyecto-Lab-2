const Pedido  = require('../models/pedido');
const Orden  = require('../models/orden');
const ordenController= require('../controllers/ordenController')
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
const crearPedido = async (req, res) => {
  const{ id, diagnostico, nombre_medico, nro_matricula,fechacreacion,fechaEntrega,valorPrioridad,estado_orden,analisisMuestras }= req.body;
 
  try {
    const pedido =  Pedido.create({
      id_persona: id,
      diagnostico:diagnostico,
      nombre_medico:nombre_medico,
      nro_matricula:nro_matricula

    }).then(registro=>{
      registro.id_pedido;
     
      ordenController.crearOrden(registro.id_pedido,true,fechacreacion,fechaEntrega,valorPrioridad,estado_orden,analisisMuestras)
    }).then(()=>{
      res.send({mensaje: "Creadas las cosas"})
    })
   
    return pedido;
  } catch (error) {
    console.error('Error al crear el pedido:', error);
    throw error;
  }
};
const updatePedido = async (req, res) => {
  const { id } = req.params; // ID de la muestra a actualizar
  const { diagnostico, nombre_medico, nro_matricula } = req.body; // Nuevos datos

  try {
    const updatedPedido = await Pedido.update({
      diagnostico:diagnostico, 
      nombre_medico:nombre_medico, 
      nro_matricula:nro_matricula
    }, {
      where: { id_pedido: id }
    });

    if (updatedPedido[0] === 1) {
      res.status(200).json({ message: 'Pedido actualizada correctamente' });
    } else {
      res.status(404).json({ error: 'Pedido no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  list,
  getById,
  crearPedido,
  updatePedido
};
