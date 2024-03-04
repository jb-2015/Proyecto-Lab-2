const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Estado = require('../models/estado');
const Examen = require('../models/examen');
const Orden = require('../models/orden');
const Muestra = require('../models/muestra');
const Determinacion = require('../models/determinacion');
const CambioEstado = require('../models/cambio_estado');
const Pedido = require('../models/pedido');
const Persona = require('../models/persona');
const Analisis = require('../models/analisis');
const ValorRef = require('../models/valor_ref');
const guia_muestra= require('../models/guia_muestra')
const Registro_valores = require('../models/registro_valores')

const analisisPorOrden = async (id_o, callback) => {
    Analisis.findAll({
        include: [
            {
                model: Orden,
                as: orden,
                where: {
                    id_orden: id_o
                }
            }
        ]
    }).then(analisis => {
        callback({ data: analisis, OK: true });
    }).catch(error => { // Utiliza una función de flecha aquí
        callback({ data: error, OK: false });
    });
};
