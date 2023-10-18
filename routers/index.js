

const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const router = express.Router();




  
  router.use(express.static("public"))
  router.use("/css",express.static('public/css'))
  router.use("/js",express.static('public/js'))
  router.use("/images",express.static('public/images'))
  
  router.use(morgan('dev'))
  router.use(bodyParser.json())
  router.use(bodyParser.urlencoded({extended:false}))
  
  
  
  
  router.get("/",(req,res)=>{
    res.render("home")
  })
  router.get("/portal-paciente",(req,res)=>{
    res.render("accesoPaciente")
  })
  router.get("/portal-personal",(req,res)=>{
    res.render("accesoPersonal")
  })
  router.get("/page-administrativo",(req,res)=>{
    res.render("page-administrativo")	
  })
  router.get("/panel-paciente",(req,res)=>{
      res.render('panelPaciente')
  })
  
 
  



  ///Eduardo/////////////////////////////////////////////////////////////////
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
