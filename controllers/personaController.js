const  Persona  = require('../models/persona');

const Pedido = require('../models/pedido');
const Orden = require('../models/orden');
const ordenController=require('./ordenController')
const list = async (req, res) => {
  try {
    const persona = await Persona.findAll();
    res.json(persona);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const nuevaPersona = await Persona.create(req.body);
    res.json(nuevaPersona);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedRows] = await Persona.update(req.body, {
      where: { id_persona: id },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ error: 'Persona no encontrada' });
    } else {
      res.json(updatedRows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await Persona.destroy({
      where: { id_persona: id },
    });
    if (deletedRowCount === 0) {
      res.status(404).json({ error: 'Persona no encontrada' });
    } else {
      res.json({ message: 'Persona eliminada exitosamente' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findById = async (req, res) => {
  const { id } = req.params;
  try {
    const persona = await Persona.findByPk(id);
    if (persona) {
      res.json(persona);
    } else {
      res.status(404).json({ error: 'Persona no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findByNombre = async (req, res) => {
  const { nombre } = req.params;
  try {
    const personas = await Persona.findAll({ where: { nombre}});
    res.json(personas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findByDni = async (req, res) => {
  const { dni } = req.params;
  try {
    const persona = await Persona.findOne({
      where: {
        dni: dni,
      },
    });
    if (persona) {
      //res.render('panelPaciente',{personas:persona})
      res.json(persona);
      
    } else {
      //res.status(404).json({ error: 'Persona no encontrada' });
      res.send(false)
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findByApellido = async (req, res) => {
  const { apellido } = req.params;
  try {
    const personas = await Persona.findAll({
      where: {
        apellido: apellido,
      },
    });
    res.json(personas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const persona = await Persona.findOne({
      where: {
        email: email,
      },
    });
    if (persona) {
      res.json(persona);
    } else {
      res.status(404).json({ error: 'Persona no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const obtenerCantidadTotal = async (req, res) => {
  try {
    const cantidadTotal = await Persona.count();
    res.json({ cantidadTotal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener la cantidad total de personas' });
  }
};




const obtenerDatosPersonasConOrdenes = async () => {
  try {
    const personasConPedidos = await Persona.findAll({
      include: [
        {
          model: Pedido,
          as: 'pedidos',
          attributes: ['id_pedido', 'estado', 'fecha_creacion'],
        }
      ]
    });

    return personasConPedidos;
  } catch (error) {
    console.error(error.message);
    throw new Error('Error al obtener personas con órdenes');
  }
}

const tabla = async (req, res) => {
  try {
    const personasConOrdenes = await obtenerDatosPersonasConOrdenes();
    res.render('tabla', { personasConOrdenes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  list,
  create,
  update,
  remove,
  findById,
  findByNombre,
  findByDni,
  findByApellido,
  findByEmail,
  obtenerCantidadTotal,
  obtenerDatosPersonasConOrdenes,
  tabla,

};

