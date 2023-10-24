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
    const { nombre, apellido, dni, fecha_nacimient, genero,embarazada, direccion, tel, email } = req.body;

  try {
    const persona = await Persona.create({
      nombre,
      apellido,
      dni,
      fecha_nacimient,
      genero,
      embarazada,
      direccion,
      tel,
      email
    });
    //res.render('panelPaciente',{ persona })
    //res.redirect(`/persona/panel-te/${dni}`);
   res.status(201).json({ message: 'Persona creada correctamente', persona });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params; // ID de la persona a actualizar
  const { nombre, apellido, dni, fecha_nacimient, genero, direccion, tel, email } = req.body; // Nuevos datos

  try {
    const updatedPersona = await Persona.update({
      nombre,
      apellido,
      dni,
      fecha_nacimient,
      genero,
      direccion,
      tel,
      email
    }, {
      where: { id_persona: id }
    });

    if (updatedPersona[0] === 1) {
      res.status(200).json({ message: 'Persona actualizada correctamente' });
    } else {
      res.status(404).json({ error: 'Persona no encontrada' });
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

const renderDni = async (req, res) => {
  const { dni } = req.params;
  try {
    const persona = await Persona.findOne({
      where: {
        dni: dni,
      },
    });
    if (persona) {
     res.render('panelPaciente',{ persona })
      //res.json(persona);
      
    } else {
      //res.status(404).json({ error: 'Persona no encontrada' });
      res.render("createPaciente")
      //res.send(false)
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
/*
const findByDni = async (dni) => {
  
  try {
    const persona = await Persona.findOne({
      where: {
        dni: dni,
      },
    });
    if (persona) {
      //res.render('panelPaciente',{personas:persona})
      //console.log(persona)
     return persona;
      
    } else {
      //res.status(404).json({ error: 'Persona no encontrada' });
      return false;
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

*/
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
  renderDni,
  list,
  create,
  update,
  remove,
  findById,
  findByNombre,
  //findByDni,
  findByApellido,
  findByEmail,
  obtenerCantidadTotal,
  obtenerDatosPersonasConOrdenes,
  tabla,

};
