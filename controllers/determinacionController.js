const Determinacion  = require('../models/determinacion');
const Examen = require('../models/examen');
const ValorRef = require('../models/valor_ref');
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



module.exports = {
  list,
  getById,
  obtenerResultadoExamen
};
