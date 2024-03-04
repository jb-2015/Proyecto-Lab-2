const Muestra = require("../models/muestra");
const Orden = require("../models/orden");
const Pedido = require("../models/pedido"); // Asegúrate de importar los modelos necesarios
const Persona = require("../models/persona");
const Analisis = require("../models/analisis");
const Examen = require("../models/examen");

const CambioEstado = require("../models/cambio_estado");
const GuiaMuestra = require("../models/guia_muestra");
const registro_valores = require("../models/registro_valores");
const Estado = require("../models/estado");
const list = async (req, res) => {
  try {
    const muestra = await Muestra.findAll();
    res.json(muestra);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const muestra = await Muestra.findByPk(id);
    if (muestra) {
      res.json(muestra);
    } else {
      res.status(404).json({ error: "Muestra no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const crear = async (id_orden, fecha_recoleccion, entregado, id_guiaM) => {
  const nuevaMuestra = {
    id_orden: id_orden,
    fecha_recoleccion: fecha_recoleccion,
    entregado: entregado,
    id_guiaM: id_guiaM,
  };
  Muestra.create(nuevaMuestra);
};
const deleteByIdMuestra = async (req, res) => {
  const { id } = req.params;
  try {
    const muestra = await Muestra.findByPk(id);
    if (muestra) {
      await muestra.destroy();
      res.json({ message: "muestra eliminado correctamente" });
    } else {
      res.status(404).json({ error: "muestra no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const obtenerMuestra = async (id) => {
  const muestra = await Muestra.findAll({
    attributes: ["id_muestra", "id_orden", "entregado", "fecha_recoleccion"],
    include: [
      {
        model: Orden,
        attributes: [
          "id_orden",
          "id_pedido",
          "estado",
          "fecha_creacion",
          "fecha_entrega",
          "prioridad",
        ],
        as: "orden",
        include: [
          {
            model: Examen,
            attributes: [
              "id_examen",
              "id_orden",
              "id_analisis",
              "descripcion",
              "resultado",
              "fecha_resultado",
              "ex_estado",
            ],
            as: "examen",
          },
        ],
      },
      {
        model: GuiaMuestra,
        attributes: ["id_guiaM", "g_descripcion"],
        as: "guia_muestra",
        include: [
          {
            model: Analisis,
            attributes: ["id_analisis", "descripcion"],
            as: "analisis",
          },
        ],
      },
    ],
    where: {
      id_orden: id,
    },
  });

  // res.render('actualizarOrden',{orden,muestras, examen,analisis,g_muestra,cambioEstado,rol})

  return muestra;
};

const updateMuestra = async (req, res) => {
  const { id } = req.params; // ID de la muestra a actualizar
  const { entregado } = req.body; // Nuevos datos

  try {
    const updatedMuestra = await Muestra.update(
      {
        entregado: entregado,
      },
      {
        where: { id_muestra: id },
      }
    );

    if (updatedMuestra[0] === 1) {
      res.status(200).json({ message: "Muestra actualizada correctamente" });
    } else {
      res.status(404).json({ error: "Muestra no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  list,
  getById,
  crear,
  obtenerMuestra,
  updateMuestra,
  deleteByIdMuestra,
};
