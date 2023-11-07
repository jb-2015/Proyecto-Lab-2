const  Persona  = require('../models/persona');

const Pedido = require('../models/pedido');
const Orden = require('../models/orden');
const Analisis = require('../models/analisis')
const ordenController=require('./ordenController');
const CambioEstado= require('../models/cambio_estado')
const { where } = require('sequelize');
const Estado = require('../models/estado');

Persona.hasMany(Pedido, { foreignKey: 'id_persona',as: 'pedid' });
Pedido.belongsTo(Persona, { foreignKey: 'id_persona', as: 'paci' });

Pedido.hasMany(Orden, { foreignKey: 'id_pedido', as: 'ord' });
Orden.belongsTo(Pedido, { foreignKey: 'id_pedido', as: 'pedOrd' });
Orden.hasMany(Analisis, { foreignKey: 'id_analisis',as: 'analisisOrden' });



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
const buscarPorId= async (id,callback) => {
  
  try {
    const persona = await Persona.findByPk(id);
    if (persona) {
      callback({persona,existe:true})
    } else{
      callback({existe: false})
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
    
    const ordenes = await Orden.findAll({
      attributes: [
        'id_orden',
        'fecha_creacion',
        'estado',
        
      ],
      include: [{
        model: Pedido,
        as: 'pedOrd',
        attributes:['id_persona','nombre_medico','nro_matricula'],
        where:{
          id_persona : persona.id_persona
        }
      },{
        model: Analisis,
        as: 'analisisOrden',
        attributes: ['descripcion'],
        as: 'analisis'
      },
      {
        model: CambioEstado,
        as: 'cambioEstado',
        include:[
          {
            model: Estado,
            as: 'estado',
            attributes:['nombre']
          }
        ],
        order: [['id','DESC']],
        limit: 1
      }
    ],
      where:{
        estado:true
      }
      
    })
    console.log(ordenes)
    
    let resOrd=[]
    ordenes.forEach(async (o)=>{
          const cambios = await CambioEstado.findOne({
            include: [{
              model:Orden,
              where:{
                id_orden: o.id_orden
                    },
              as: 'orden'
              },
              {
                model: Estado,
                attributes: ['nombre'],
                as: 'estado'
              }
            ],
            order: [['id','DESC']],
            Limit: 1
            
          })
          resOrd.push({
            orden: o,
            estado: cambios
          })

    })

    console.log("CAMBIOS DE ESTADO")
    console.log(resOrd)

    if (persona) {  
     res.render('panelPaciente',{ persona, ordenes })
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


const findByDni = async (req,res) => {    
  const{dni}=req.params;
  
  try {
    const persona = await Persona.findOne({
      where: {
        dni: dni,
      },
    });
    if (persona) {
      res.send(true);
  } else {
    res.send(false)
  }
} catch (error) {
  console.error('Error al buscar la persona:', error);
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
  renderDni,
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
  buscarPorId

};
