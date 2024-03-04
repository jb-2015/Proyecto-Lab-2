const { Op } = require('sequelize');


const Examen  = require('../models/examen');
const Estado = require('../models/estado');

const Orden = require('../models/orden');
const Muestra = require('../models/muestra');
const Determinacion = require('../models/determinacion');
const CambioEstado = require('../models/cambio_estado');
const Pedido = require('../models/pedido');
const Persona = require('../models/persona');
const Analisis = require('../models/analisis');
const ValorRef = require('../models/valor_ref');
const guia_muestra = require('../models/guia_muestra');
const registro_valores = require('../models/registro_valores');
const sequelize = require('../config/database');
const list = async (req, res) => {
  try {
    const examen = await Examen.findAll();
    res.json(examen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const examen = await Examen.findByPk(id);
    if (examen) {
      res.json(examen);
    } else {
      res.status(404).json({ error: 'Valor de referencia no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const examen = await Examen.findByPk(id);
    if (examen) {
      await examen.destroy();
      res.json({ message: 'Examen eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Examen no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const cambiarDatosExamen = (req, res) => {
  const { id } = req.params;

  
  Orden.findOne({
      where: {
          id_examen: id
      }
  })
  .then(orden => {
      if (orden) {
          return res.json({ mensaje: 'No puedes cambiar los datos de un examen con órdenes asociadas.' });
      }

    
      res.json({ mensaje: 'Datos del examen cambiados exitosamente.' });
  })
  .catch(error => {
     
      res.status(500).json({ error: 'Error interno del servidor.' });
  });
}

const crearExamen = async (id_o,descripcion,resultado,fecha_result,id_analisis)=>{
    const nuevoExamen={
      id_orden: id_o,
      descripcion:descripcion,
      resultado: resultado,
      fecha_resultado:fecha_result,
      id_analisis: id_analisis,
      ex_estado:0
    }

    return await Examen.create(nuevoExamen)
}
/*
const getForReg = async (id,callBack)=>{
  Examen.findOne({
    include:[
      {
        model: Analisis,
        as: 'analisis',
        attributes:['id_analisis','descripcion'],
        include:[
          {
            model: Determinacion,
            as: 'determinacion',
            include:[
              {
                model: ValorRef,
                as:'valorRef'
              }
            ]
          }
        ]
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
    }
  }).then(examen=>{
    console.log(examen)
    
    callBack(examen)
  })
}
*/
const getForReg = async (id, genero,callBack)=>{
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
  [Op.or]: [
    { sexo: genero },
    { sexo: null }
  ], // Agregar condición solo si genero no es null
}
    });



    callBack(examen, determinacion, valor_Ref)
  
} catch (error) {
  console.error('Error:', error);
  // Devolver JSON en caso de error

}
};

const getPreInfo = async (id, genero,callBack)=>{
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
         attributes:['id_orden'],
        as:'orden',
        include:[
          {
            model:Pedido,
            as: 'pedido',
            include:[
              {
                model: Persona,
                as:'persona',
                attributes:['id_persona','genero',[sequelize.literal('YEAR(CURDATE()) - YEAR(fecha_nacimient)'), 'edad']]
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

const registroDeValor = await registro_valores.findAll({
  attributes:['id_reg', 'id_determinacion', 'id_examen', 'valor'],
  where: {
      id_determinacion: idDeterminaciones

  },
})

    const valor_Ref= await ValorRef.findAll({
attributes:['id_val_ref', 'id_determinacion', 'sexo', 'val_max', 'val_min', 'rango_edad'],

where: {
    id_determinacion: idDeterminaciones,
    [Op.or]: [
      { sexo: genero },
      { sexo: null }
    ], // Agregar condición solo si genero no es null
},
    });

    callBack(examen, determinacion, valor_Ref, registroDeValor)
  
} catch (error) {
  console.error('Error:', error);
  // Devolver JSON en caso de error

}
};
const cambiarEstadoDeEx = async (req, res) => {
  const { id } = req.params;
 
  try {
    const examenEstado = await Examen.update(
      { ex_estado: 1 }, // Define los campos que deseas actualizar y sus nuevos valores
      { where: { id_examen: id } } // Define la condición para la actualización
    );
   
    if (examenEstado) {
   
      res.status(200).json({ message: 'Estado del examen actualizado correctamente' });
    } else {
      res.status(404).json({ error: 'No se encontró ningún examen para actualizar' });
    }
  } catch (error) {
    
    res.status(500).json({ error: 'Error al actualizar el estado del examen' });
  }
};

const cambiarEstadoDeExACero = async (req, res) => {
  const { id } = req.params;
 
  try {
    const examenEstado = await Examen.update(
      { ex_estado: 0 }, // Define los campos que deseas actualizar y sus nuevos valores
      { where: { id_examen: id } } // Define la condición para la actualización
    );
   
    if (examenEstado) {
   
      res.status(200).json({ message: 'Estado del examen actualizado correctamente' });
    } else {
      res.status(404).json({ error: 'No se encontró ningún examen para actualizar' });
    }
  } catch (error) {
   
    res.status(500).json({ error: 'Error al actualizar el estado del examen' });
  }
};



module.exports = {
  cambiarEstadoDeEx,
  cambiarEstadoDeExACero,
  getForReg,
  getPreInfo,
  cambiarDatosExamen,
  list,
  getById,
  crearExamen,
  deleteById,
  ingresarExamen: async (req, res) => {
    try {
      const { nombre, descripcion, determinaciones, valoresReferencia, muestras } = req.body;

      const examen = await Examen.create({
        nombre,
        descripcion,
      });

      if (determinaciones && determinaciones.length > 0) {
        await examen.setDeterminaciones(determinaciones);
      }

      if (valoresReferencia && valoresReferencia.length > 0) {
        await examen.setValoresReferencia(valoresReferencia);
      }

      if (muestras && muestras.length > 0) {
        await examen.setMuestras(muestras);
      }

      res.status(200).json({ message: 'Examen ingresado exitosamente.' });
    } catch (error) {

      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },


  actualizarExamen: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, descripcion, determinaciones, valoresReferencia, muestras } = req.body;

      await Examen.update(
        { nombre, descripcion },
        { where: { id } }
      );

      const examen = await Examen.findByPk(id);

      if (determinaciones) {
        await examen.setDeterminaciones(determinaciones);
      }

      if (valoresReferencia) {
        await examen.setValoresReferencia(valoresReferencia);
      }

      if (muestras) {
        await examen.setMuestras(muestras);
      }

      res.status(200).json({ message: 'Examen actualizado exitosamente.' });
    } catch (error) {
    
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },
 


  activarDesactivarExamen: async (req, res) => {
    try {
      const { id } = req.params;
      const { activo } = req.body;

      await Examen.update(
        { activo },
        { where: { id } }
      );

      res.status(200).json({ message: 'Estado del examen actualizado exitosamente.' });
    } catch (error) {

      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },
  
};

