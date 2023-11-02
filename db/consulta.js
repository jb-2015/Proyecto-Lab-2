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

ValorRef.belongsTo(Determinacion, { foreignKey: 'id_determinacion' });
Determinacion.hasMany(ValorRef, { foreignKey: 'id_determinacion' });

Pedido.belongsTo(Persona, { foreignKey: 'id_persona', as: 'persona' });
Persona.hasOne(Pedido, { foreignKey: 'id_persona', as: 'pedido' });


Orden.belongsTo(Pedido, { foreignKey: 'id_pedido', as: 'pedido' });
Pedido.hasOne(Orden, { foreignKey: 'id_pedido', as: 'orden'});


Orden.belongsTo(Analisis, { foreignKey: 'id_analisis', as: 'analisis' });
Analisis.hasMany(Orden, { foreignKey: 'id_analisis', as: 'orden' });

Analisis.hasMany(guia_muestra, { foreignKey: 'id_analisis', as: 'guia_muestra' });


Muestra.belongsTo(Orden, { foreignKey: 'id_orden', as: 'orden' });
Orden.hasOne(Muestra, { foreignKey: 'id_orden', as: 'muestra' });

Examen.belongsTo(Orden, { foreignKey: 'id_orden', as: 'orden' });
Orden.hasMany(Examen, { foreignKey: 'id_orden', as: 'examen' });

Determinacion.belongsTo(Analisis, { foreignKey: 'id_analisis', as: 'analisis'  });
Analisis.hasMany(Determinacion, { foreignKey: 'id_analisis', as: 'determinacion'  });

CambioEstado.belongsTo(Orden, { foreignKey: 'id_orden', as: 'orden'  });
Orden.hasMany(CambioEstado, { foreignKey: 'id_orden', as: 'cambioEstado'  });

CambioEstado.belongsTo(Estado, { foreignKey: 'id_estado', as: 'estado'  });
Estado.hasMany(CambioEstado, { foreignKey: 'id_estado', as: 'cambio_estado'  });

Examen.belongsTo(Analisis,{foreignKey:'id_analisis', as: 'analisis'})
Analisis.hasMany(Examen,{foreignKey:'id_analisis', as: 'examen'})

Registro_valores.belongsTo(Examen,{foreignKey:'id_examen', as: 'examen'})
Examen.hasMany(Registro_valores,{foreignKey:'id_examen', as: 'examen'})



  
module.exports = {
   
    realizarConsulta: (req, res) => {
        Pedido.findAll({
            attributes: [
              [sequelize.literal('persona.nombre'), 'nombre'],
              [sequelize.literal('persona.apellido'), 'apellido'],
              [sequelize.literal('persona.dni'), 'dni'],
              [sequelize.literal('persona.genero'), 'sexo'],
              [sequelize.literal('orden.id_orden'), 'orden'],
              [sequelize.literal('orden.estado'), 'estado'],
              [sequelize.literal('orden.fecha_creacion'), 'fecha_creacion']
            ],
            include: [
              {
                model: Persona,
                attributes: [],
                as: 'persona'
              },
              {
                model: Orden,
                attributes: [],
                as: 'orden'
              }
            ],
            raw: true,
          })
          .then(result => {
           res.render('pacienTec', { pedidos: result });
          })
          .catch(error => {
            console.error('Error:', error);
          });
    },

    obtenerResultados : (req, res) => {
       
        
        Orden.findAll({
          //where: {
           // id_orden: id
          // },
          attributes: [
            
          ],
          include: [
            {
              model: Pedido,
              attributes: [],
              as: 'pedido',
              include: [
                {
                  model: Persona,
                  attributes: [ 'nombre',
                  'apellido', [sequelize.literal('YEAR(CURDATE()) - YEAR(fecha_nacimient)'), 'edad']],
                  as: 'persona'
                }
              ],
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
         
        distinct: true,
        raw: true,
    })
        .then(id => {
            res.render('orden', { resultados: id });
           // res.render('orden', { ordenId: ordenId });
        })
        .catch(error => {
          console.error('Error:', error);
        });
        
    }
  };
  