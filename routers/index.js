
const express = require('express');
const router = express.Router();

  const consultaController = require('../db/consulta');
  
  
  router.get('/pacienTec', consultaController.realizarConsulta);
  router.get('/orden/:id', consultaController.obtenerResultados);
  router.get('/nueva-orden', (req, res) => {
    
    res.render('crearOrden.ejs');
  });

const analisisRouter = require('./analisis');
const cambioEstadoRouter = require('./cambio_estado');
const deterRouter = require('./determinacion');
const estadoRouter = require('./estado');
const examenRouter = require('./examen');
const muestraRouter = require('./muestra');
const ordenRouter = require('./orden');
const pedidoRouter = require('./pedido');
const personaRouter = require('./persona');
const usuarioRouter = require('./usuario');
const valorRefRouter = require('./valor_ref');
// Usar las rutas individuales
router.use('/analisis', analisisRouter);
router.use('/cambio_estado', cambioEstadoRouter);
router.use('/determinacion', deterRouter);
router.use('/estado', estadoRouter);
router.use('/examen', examenRouter);
router.use('/muestra', muestraRouter);
router.use('/orden', ordenRouter);
router.use('/pedido', pedidoRouter);
router.use('/persona', personaRouter);
router.use('/usuario', usuarioRouter);
router.use('/valor_ref', valorRefRouter);
module.exports = router;
