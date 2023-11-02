const Orden = require('../models/orden');
const Pedido = require('../models/pedido'); // Asegúrate de importar los modelos necesarios
const Persona = require('../models/persona');
const Analisis = require('../models/analisis');
const Examen = require('../models/examen');
const Muestra = require('../models/muestra');
const CambioEstado = require('../models/cambio_estado')
const sequelize = require('../config/database'); // Asegúrate de importar sequelize y configurarlo correctamente
const consulta= require('../db/consulta'); 
const Estado = require('../models/estado');



/** PROBANDO */


/*////////////////////////////////*/


const list = async (req, res) => {
  try {
    const orden = await Orden.findAll();
    res.json(orden);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const orden = await Orden.findByPk(id);
    if (orden) {
      res.json(orden);
    } else {
      res.status(404).json({ error: 'Orden no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerDatosOrdenes = async () => {
  try {
    const ordenes = await Orden.findAll();
    return ordenes;
  } catch (error) {
    throw new Error('Error al obtener datos de órdenes');
  }
};

const buscarPorId =async (req, res) => {
  const { id } = req.params;

  
  Orden.findOne({
    attributes: [],
    include: [
      {
        model: Pedido,
        attributes: [],
        as: 'pedido',
        include: [
          {
            model: Persona,
            attributes: [
              'nombre',
              'apellido',
              [sequelize.literal('YEAR(CURDATE()) - YEAR(fecha_nacimient)'), 'edad']
            ],
            as: 'persona'
          }
        ]
      },
      {
        model: Analisis,
        attributes: ['descripcion'],
        as: 'analisis'
      },
      {
        model: Examen,
        attributes: [],
        as: 'examen',
      },
      {
        model: Muestra,
        attributes: ['tipo_muestra'],
        as: 'muestra'
      }
    ],
    where: {
      id_orden: id
    },
   // distinct: true,
    raw: true,
  })
  .then(result => {
  
   // console.log(resultado);
   res.render('vistaOrden', {rol:'' , result});
   // res.json(resultado); // Agrega esta línea para enviar el resultado como respuesta
  })
  .catch(error => {
    console.error('Error al realizar la consulta:', error);
    res.status(500).json({ error: error.message }); // En caso de error, enviar un mensaje de error 500
  });
};

const listarPorID = async (req,res)=>{
    const {id}= req.params

    const orden= await Orden.findOne({
      attributes:['id_orden','estado','fecha_creacion'],
      include:[ 
        {
          model:Pedido,
          attributes:['diagnostico'],
          include:[
            {
              model:Persona,
              attributes:['nombre','apellido','dni'],
              as:'persona'
            }
          ],
          as : 'pedido'
        },{
          model:Analisis,
          attributes:['descripcion','tipo'],
          as:'analisis'
        }
      ],
      where:{
        id_orden: id
      }
    })
    const muestras= await Muestra.findAll({
      attributes:['tipo_muestra','entregado','fecha_recoleccion'],
      include:[
        {
          model: Orden,
          attributes:[],
          as: 'orden'
        }
      ],
      where:{
        id_orden:id
      }
    })
    if(orden){
      res.render('vistaOrden',{orden,muestras,rol:''})
    }

}
  const crearOrden = async (idPedido, idAnalisis, estado, fechaCreacion,estadoOrden,mstrs) => {
    try {
      const nuevaOrden = {
        id_pedido: idPedido,
        id_analisis: idAnalisis,
        estado: estado,
        fecha_creacion: fechaCreacion
      };
  
      const ordenCreada = await Orden.create(nuevaOrden);
      const nuevoCambioEstado= {
        id_estado:estadoOrden,
        id_orden: ordenCreada.id_orden
      }
      const cambioEstado= await CambioEstado.create(nuevoCambioEstado)

      mstrs.forEach(m=>{
        const fecha= m.entregado ? fecha_hoy() : null
        Muestra.create({
          id_orden: ordenCreada.id_orden,
          fecha_recoleccion: fecha,
          tipo_muestra: m.nombre_muestra,
          entregado: m.entregado
          
        })
      })


  
      return ordenCreada;
    } catch (error) {
      throw new Error('Error al crear la orden');
    }
  };
  function fecha_hoy(){
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Asegura que el mes tenga dos dígitos
    const day = String(now.getDate()).padStart(2, '0'); // Asegura que el día tenga dos dígitos
    const hour = String(now.getHours()).padStart(2, '0'); // Asegura que la hora tenga dos dígitos
    const minute = String(now.getMinutes()).padStart(2, '0'); // Asegura que los minutos tengan dos dígitos
    const second = String(now.getSeconds()).padStart(2, '0'); // Asegura que los segundos tengan dos dígitos

    const fechaHora = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

    return fechaHora;
  }
  const obtenerDescripcionesAnalisis = async () => {
    try {
      const descripciones = await Analisis.findAll({
        attributes: ['descripcion']
      });
  
      return descripciones.map(analisis => analisis.descripcion);
    } catch (error) {
      throw new Error('Error al obtener descripciones de análisis: ' + error.message);
    }
  };

  const buscarPorEstado = async (est, cback)=>{
    
    const query2 = `SELECT o.id_orden ,a.descripcion, e.nombre as est,o.fecha_creacion, per.nombre as nombre_persona,per.apellido as apellido_persona,per.dni as dni_persona
    FROM orden o
    INNER JOIN cambio_estado ce ON o.id_orden = ce.id_orden 
    JOIN estado as e on e.id_estado=ce.id_estado 
    JOIN analisis as a on a.id_analisis=o.id_analisis
    JOIN pedido as p on p.id_pedido=o.id_pedido
    JOIN persona as per on per.id_persona=p.id_persona
    WHERE ce.id = (
        SELECT MAX(ce2.id)
        FROM cambio_estado ce2
        WHERE ce2.id_orden = o.id_orden and ce.id_estado=2
    )`

      sequelize.query(query2,{model: Orden,mapToModel: true,raw: false})
      .then(ordenes => {
        // Aquí tenemos la lista de órdenes que cumplen con los criterios
        cback(ordenes)
        console.log(ordenes);
      })
      .catch(err => {
        console.error('Error:', err);
      });
    

      
  }

  const buscarParaValidar = async (cback)=>{
    
    const query2 = `SELECT o.id_orden ,a.descripcion, e.nombre as est,o.fecha_creacion, per.nombre as nombre_persona,per.apellido as apellido_persona,per.dni as dni_persona, per.genero as genero_persona
    FROM orden o
    INNER JOIN cambio_estado ce ON o.id_orden = ce.id_orden 
    JOIN estado as e on e.id_estado=ce.id_estado 
    JOIN analisis as a on a.id_analisis=o.id_analisis
    JOIN pedido as p on p.id_pedido=o.id_pedido
    JOIN persona as per on per.id_persona=p.id_persona
    WHERE ce.id = (
        SELECT MAX(ce2.id)
        FROM cambio_estado ce2
        WHERE ce2.id_orden = o.id_orden and ce.id_estado=4
    )`

      sequelize.query(query2,{model: Orden,mapToModel: true,raw: false})
      .then(ordenes => {
        // Aquí tenemos la lista de órdenes que cumplen con los criterios
        cback(ordenes)
        console.log(ordenes);
      })
      .catch(err => {
        console.error('Error:', err);
      });
    

      
  }
module.exports = {
  obtenerDescripcionesAnalisis,
  crearOrden,
  list,
  getById,
  obtenerDatosOrdenes,
  buscarPorId,
  listarPorID,
  buscarPorEstado,
  buscarParaValidar
};
