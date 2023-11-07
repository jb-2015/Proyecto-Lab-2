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
      console.error('Error al cambiar datos del examen:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
  });
}

const crearExamen = async (id_o,descripcion,resultado,fecha_result,id_analisis)=>{
    const nuevoExamen={
      id_orden: id_o,
      descripcion:descripcion,
      resultado: resultado,
      fecha_resultado:fecha_result,
      id_analisis: id_analisis
    }

    await Examen.create(nuevoExamen)
}


module.exports = {
  cambiarDatosExamen,
  list,
  getById,
  crearExamen,

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
      console.error('Error al ingresar el examen:', error);
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
      console.error('Error al actualizar el examen:', error);
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
      console.error('Error al actualizar el estado del examen:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },
};

