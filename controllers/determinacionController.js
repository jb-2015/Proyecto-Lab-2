const Determinacion  = require('../models/determinacion');
const Examen = require('../models/examen');
const ValorRef = require('../models/valor_ref');
const Registro_valores = require('../models/registro_valores')
const Analisis = require('../models/analisis');
const Orden = require("../models/orden");
const Pedido = require("../models/pedido"); // Asegúrate de importar los modelos necesarios
const Persona = require("../models/persona");
const Muestra = require("../models/muestra");
const CambioEstado = require("../models/cambio_estado");
const GuiaMuestra = require("../models/guia_muestra");
const registro_valores = require("../models/registro_valores");
const Estado = require("../models/estado");


const { Op } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de importar sequelize y configurarlo correctamente
const consulta= require('../db/consulta'); 

const list = async (req, res) => {
  try {
    const deter = await Determinacion.findAll();
    res.json(deter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const deter = await Determinacion.findByPk(id);
    if (deter) {
      res.json(deter);
    } else {
      res.status(404).json({ error: 'Valor de referencia no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
/*
const obtenerResultadoExamen = async (req, res)=> {
  const id_orden = req.params.id_orden;
  const sexo = req.params.sexo;
  
  
  console.log(id_orden, sexo)
  try {
    const resultados = await ValorRef.findAll({
      as: 'valorRef',
      attributes: [
       
      ],
      include: [
        {
          model: Determinacion,
          as: 'determinacion',
          attributes: [
            [sequelize.literal('valorRef.nombre'), 'nombre'],
            [sequelize.literal('determinacion.valor'), 'valor'],
            [sequelize.literal( 'determinacion.unidad_medida'),  'unidad_medida'],
            [sequelize.literal( 'val_max'),  'val_max'],
            [sequelize.literal( 'val_min'),  'val_min'],
            [sequelize.literal( 'sexo'),  'sexo'],
            [sequelize.literal( 'rango_edad'),  'rango_edad'],
           
          ],
          include: [
            {
              model: Examen,
              as: 'examenD',
              attributes: ['nombre_examen'],
              where: {
                id_orden: id_orden
              }
            }
          ]
        }
      ],
      where: {
        sexo: sexo
       // Asegúrate de tener una columna llamada 'id_examen' en tu modelo de Examen
      }
    });
    const resultadosFiltrados = resultados.filter(item => item.determinacion !== null);
console.log(resultados)
    //res.json(resultadosFiltrados);
    res.render('vistaExaYdeter', { resultados: resultadosFiltrados });
  } catch (error) {
    throw new Error(`Error al realizar la consulta: ${error.message}`);

  }
};
*/

const obtenerResultadoExamen = async (req, res)=> {
  const {id_examen} = req.params
  const {id_orden} = req.params
  const {genero} = req.params
  const {rol} = req.params
  try{
    const resultados = await ValorRef.findAll({
      
      attributes: [
        [sequelize.literal('determinacion.nombre'), 'Determinacion'],
        [sequelize.col('determinacion.determinacion.valor'), 'Valor'],
        [sequelize.col('determinacion.unidad_medida'), 'unidad_medida'],
        [sequelize.col('determinacion.determinacion.examen.analisis.descripcion'), 'descripcion'],
        [sequelize.col('determinacion.determinacion.examen.id_orden'), 'idOrden'],
        [sequelize.col('determinacion.determinacion.examen.id_examen'), 'id_examen'],
        'val_max',
        'val_min',
        'sexo',
        'rango_edad'
        
        
      ],
      include: [
        {
          model: Determinacion,
          as: 'determinacion',
          attributes: ['unidad_medida'],
          include: [
            {
              model: Registro_valores,
              as: 'determinacion',
              attributes: [],
              include: [
                {
                  model: Examen,
                  as: 'examen',
                  attributes: ['id_examen'],
                  include: [
                    {
                    model: Analisis,
                    as: 'analisis',
                  attributes: [],
                }],
                  where: {
                    id_examen: id_examen,
                   
                  }
                }
              ]


            }
          ]
        }
      ],
      where: {
      
        [Op.or]: [
          { sexo: genero },
          { sexo: null }
        ], // Agregar condición solo si genero no es null
      }
      
    });
    

const resultadosFiltrados = resultados.filter(item => item.dataValues.Valor !== null);


const orden = await Orden.findOne({
  attributes: [
    "id_orden",
    "estado",
    "fecha_creacion",
    "fecha_entrega",
    "prioridad",
    "estado"
  ],
  include: [
    {
      model: Pedido,
      attributes: ["diagnostico", "nombre_medico", "nro_matricula"],
      include: [
        {
          model: Persona,
          attributes: [
            "id_persona",
            "nombre",
            "apellido",
            "dni",
            "genero",
            [
              sequelize.literal("YEAR(CURDATE()) - YEAR(fecha_nacimient)"),
              "edad",
            ],
          ],
          as: "persona",
        },
      ],
      as: "pedido",
    },
    {
      model: Analisis,
      attributes: ["descripcion", "tipo"],
      as: "analisis",
    },
  ],
  where: {
    id_orden: id_orden,
  },
});

  // res.json({resultadosFiltrados, orden});
  res.render('vistaExaYdeter', { resultados: resultadosFiltrados,orden,rol });
  } catch (error) {
    throw new Error(`Error al realizar la consulta: ${error.message}`);

  }
};

const obtenerDeter = async (req, res)=> {
  const id_orden = req.params.id_orden;
  const sexo = req.params.sexo;
  try{
    const resultados = await ValorRef.findAll({
      
      attributes: [
        [sequelize.literal('determina.nombre'), 'Determinacion'],
        [sequelize.col('determina.determinacion.valor'), 'Valor'],
        [sequelize.col('determina.unidad_medida'), 'unidad_medida'],
        [sequelize.col('determina.determinacion.examen.analisis.descripcion'), 'descripcion'],
        [sequelize.col('determina.determinacion.examen.id_orden'), 'idOrden'],
        
        'val_max',
        'val_min',
        'sexo',
        'rango_edad'
        
        
      ],
      include: [
        {
          model: Determinacion,
          as: 'determina',
          attributes: [],
          include: [
            {
              model: Registro_valores,
              as: 'determinacion',
              attributes: [],
              include: [
                {
                  model: Examen,
                  as: 'examen',
                  attributes: [],
                  include: [
                    {
                    model: Analisis,
                    as: 'analisis',
                  attributes: [],
                }],
                  where: {
                    id_orden: id_orden,
                    sexo: sexo
                  }
                }
              ]


            }
          ]
        }
      ]
    });
    
const resultadosFiltrados = resultados.filter(item => item.dataValues.Valor !== null);

  //res.json(resultadosFiltrados);
    res.render('vistaRegistrarValor', { resultados: resultadosFiltrados });
  } catch (error) {
    throw new Error(`Error al realizar la consulta: ${error.message}`);

  }
};




const crarDeter = async (id_orden,id_analisis,sexo)=> {

  try{
  const resultados = await ValorRef.findAll({
    attributes: [
      [sequelize.literal('determina.id_determinacion'), 'id'],
      [sequelize.literal('determina.nombre'), 'Determinacion'],
  
      'val_max',
      'val_min',
      'sexo',
      'rango_edad',
      
      [sequelize.col('determina.unidad_medida'), 'unidad_medida'],
      [sequelize.col('determina.determinacion.examen.id_examen'), 'id_examen'],
      [sequelize.col('determina.id_determinacion'), 'id_determinacion']
      
    ],
    include: [
      {
        model: Determinacion,
        as: 'determina',
        attributes: [],
        include: [
  
       {
        model: Registro_valores,
        as: 'determinacion',
        attributes: [[sequelize.literal('0'), 'valor'],],
        include: [
          {
            model: Examen,
            as: 'examen',
            attributes: [],
            
          }
                ],
               
          }
        
    ],
    where: {
      [Op.or]: [
    
        {id_analisis: id_analisis}
   
    ],
  }
  },
  ],
  
    where: {
      [Op.or]: [
        { sexo: sexo},
        { sexo: null }
      ]
    }
  })
  
  
    return resultados;
  
  //res.render('vistaRegistrarValor', { resultados });
  } catch (error) {
    throw new Error(`Error al realizar la consulta: ${error.message}`);
  
  }
  }
  


  const getResultado = async (id, genero,callBack)=>{
    try{
    const examen= await Examen.findOne({
      include:[
        {
          model: Analisis,
          as: 'analisis',
          attributes:['id_analisis','descripcion'],
         
        },
        {
          model:Orden,
          as:'orden',
          include:[
            {
              model:Pedido,
              as: 'pedido',
              include:[
                {
                  model: Persona,
                  as:'persona',
                  attributes:['genero',[sequelize.literal('YEAR(CURDATE()) - YEAR(fecha_nacimient)'), 'edad']]
                }
              ]
            }
          ]
        }
      ],
      where: {
        id_examen:id
  
      },
    });
    const idAnalisisExamen = examen?.analisis?.id_analisis;
  
  
      const determinacion= await Determinacion.findAll({
       
            attributes:['id_determinacion', 'valor', 'unidad_medida', 'nombre', 'id_analisis'],
  
          
        
        where: {
          id_analisis:idAnalisisExamen
        },
  
      });
  
      const idDeterminaciones = await determinacion.map((registro) => registro.id_determinacion);

      const valor_Ref= await ValorRef.findAll({
  attributes:['id_val_ref', 'id_determinacion', 'sexo', 'val_max', 'val_min', 'rango_edad'],
  where: {
      id_determinacion: idDeterminaciones,
      sexo: genero
  },
      });
  
      callBack(examen, determinacion, valor_Ref)
    
  } catch (error) {
    console.error('Error:', error);
    // Devolver JSON en caso de error
  
  }
  };
  

  const obtenerMasDeUnResultadoExamen = async (req, res) => {
 
    const { id_examenesArray, genero, id_orden,rol } = req.params;

    try{
      const resultados = await ValorRef.findAll({
        
        attributes: [
          [sequelize.literal('determinacion.nombre'), 'Determinacion'],
          [sequelize.col('determinacion.determinacion.valor'), 'Valor'],
          [sequelize.col('determinacion.unidad_medida'), 'unidad_medida'],
          [sequelize.col('determinacion.determinacion.examen.analisis.descripcion'), 'descripcion'],
          [sequelize.col('determinacion.determinacion.examen.id_orden'), 'idOrden'],
          [sequelize.col('determinacion.determinacion.examen.id_examen'), 'id_examen'],
          'val_max',
          'val_min',
          'sexo',
          'rango_edad'
          
          
        ],
        include: [
          {
            model: Determinacion,
            as: 'determinacion',
            attributes: ['unidad_medida'],
            include: [
              {
                model: Registro_valores,
                as: 'determinacion',
                attributes: [],
                include: [
                  {
                    model: Examen,
                    as: 'examen',
                    attributes: ['id_examen'],
                    include: [
                      {
                      model: Analisis,
                      as: 'analisis',
                    attributes: [],
                  }],
                  where: {
                    id_examen: { [Op.in]:  id_examenesArray.split(",")} // Usamos el operador $in para buscar múltiples id_examen
                  }
                  }
                ]
  
  
              }
            ]
          }
        ],
        where: {
        
          [Op.or]: [
            { sexo: genero },
            { sexo: null }
          ], // Agregar condición solo si genero no es null
        }
        
      });
      
  
  const resultadosFiltrados = resultados.filter(item => item.dataValues.Valor !== null);


  const orden = await Orden.findOne({
    attributes: [
      "id_orden",
      "estado",
      "fecha_creacion",
      "fecha_entrega",
      "prioridad",
      "estado"
    ],
    include: [
      {
        model: Pedido,
        attributes: ["diagnostico", "nombre_medico", "nro_matricula"],
        include: [
          {
            model: Persona,
            attributes: [
              "id_persona",
              "nombre",
              "apellido",
              "dni",
              "genero",
              [
                sequelize.literal("YEAR(CURDATE()) - YEAR(fecha_nacimient)"),
                "edad",
              ],
            ],
            as: "persona",
          },
        ],
        as: "pedido",
      },
      {
        model: Analisis,
        attributes: ["descripcion", "tipo"],
        as: "analisis",
      },
    ],
    where: {
      id_orden: id_orden,
    },
  });
  //res.json({orden, resultados: resultadosFiltrados})
  res.render('resultFinal', { orden, resultados: resultadosFiltrados,rol})
  //  res.render('resultFinal', { orden,resultados: resultadosFiltrados, rol:'Administrador' });
    } catch (error) {
      throw new Error(`Error al realizar la consulta: ${error.message}`);
  
    }
  };

  module.exports = {
    list,
    getById,
    obtenerResultadoExamen,
    obtenerDeter,
    getResultado,
    crarDeter,
    obtenerMasDeUnResultadoExamen
  };