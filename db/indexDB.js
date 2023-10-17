//db/indexDB.js
/*
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

ValorRef.belongsTo(Determinacion, { foreignKey: 'id_determinacion' });
Determinacion.hasMany(ValorRef, { foreignKey: 'id_determinacion' });

Pedido.belongsTo(Persona, { foreignKey: 'id_persona' });
Persona.hasMany(Pedido, { foreignKey: 'id_persona' });


Orden.belongsTo(Pedido, { foreignKey: 'id_pedido' });
Orden.belongsTo(Analisis, { foreignKey: 'id_analisis' });

Pedido.hasMany(Orden, { foreignKey: 'id_pedido' });
Analisis.hasMany(Orden, { foreignKey: 'id_analisis' });

Muestra.belongsTo(Orden, { foreignKey: 'id_orden' });
Orden.hasMany(Muestra, { foreignKey: 'id_orden' });

Examen.belongsTo(Orden, { foreignKey: 'id_orden' });
Orden.hasMany(Examen, { foreignKey: 'id_orden' });

Determinacion.belongsTo(Examen, { foreignKey: 'id_examen' });
Examen.hasMany(Determinacion, { foreignKey: 'id_examen' });

CambioEstado.belongsTo(Orden, { foreignKey: 'id_orden' });
CambioEstado.belongsTo(Estado, { foreignKey: 'id_estado' });
Orden.hasMany(Orden, { foreignKey: 'id_orden' });
Estado.hasMany(Estado, { foreignKey: 'id_estado' });
*/