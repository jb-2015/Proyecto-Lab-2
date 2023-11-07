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
  const{ id, diagnostico, nombre_medico, nro_matricula,fechacreacion,estado_orden,analisisMuestras }= req.body;
  console.log("CREAR PEDIDO estadoOrden: "+estado_orden)
  try {
    const pedido =  Pedido.create({
      id_persona: id,
      diagnostico:diagnostico,
      nombre_medico:nombre_medico,
      nro_matricula:nro_matricula

    }).then(registro=>{
      registro.id_pedido;
      console.log("Pedido Guardado")
      ordenController.crearOrden(registro.id_pedido,true,fechacreacion,estado_orden,analisisMuestras)
    }).then(()=>{
      res.send({mensaje: "Creadas las cosas"})
    })
    console.log('Pedido creado:', pedido);
    return pedido;
  } catch (error) {
    console.error('Error al crear el pedido:', error);
    throw error;
  }
};

module.exports = {
  list,
  getById,
  crearPedido
};
