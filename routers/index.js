

const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const router = express.Router();

const analisisController= require('../controllers/analisisController')
const pedidoController= require('../controllers/pedidoController')
const personaController= require('../controllers/personaController')
const estadoController = require('../controllers/estadoController')

  
  router.use(express.static("public"))
  router.use("/css",express.static('public/css'))
  router.use("/js",express.static('public/js'))
  router.use("/images",express.static('public/images'))
  
  router.use(morgan('dev'))
  router.use(bodyParser.json())
  router.use(bodyParser.urlencoded({extended:false}))
  
  const session =require('express-session')
router.use(session({
	secret: 'secret',
	resave: false,
    saveUninitialized: true,
 //  cookie: { secure: false }
}))
function requireAuth(req, res, next) {
  console.log("Middleware requireAuth activado");
  if (req.session && req.session.user) {
    return next(); // Si hay una sesión activa, permite el acceso
  }
  res.redirect('/portal-personal'); // Si no hay sesión activa, redirige al inicio de sesión
}




function checkIncognito(req, res, next) {
    const userAgent = req.headers['user-agent'];
    const isIncognito = /\/Mobile|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
    if (isIncognito) {
        req.session.destroy(); // Destruye la sesión
      // Redirige al inicio de sesión
     
      }
        next(); // Si no es incógnito, continúa con la siguiente ruta o middleware
      
  }
  
  // Utiliza el middleware checkIncognito antes de tus rutas
  router.use(checkIncognito);

  function cerrarSesion(req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error al cerrar sesión:", err);
            res.status(500).send("Error al cerrar sesión");
        } else {
            res.redirect('/'); // Puedes redirigir a donde prefieras
        }
    });
}
router.get('/cerrar-sesion', cerrarSesion);

  
 
/**ACA VA A ENTRAR CUANDO SE HAGA UN INICIO DE SESION */
  router.get('/page-administrativo', requireAuth,(req, res) => {
    res.render("page-administrativo",{rol:'administrativo'})	
  });
  router.get("/page-paciente",(req,res)=>{
    res.render("page-Paciente",{rol:'paciente'})	
  })

  router.get("/page-tecnico",(req,res)=>{
    
    res.render("page-Tecnico",{rol:'tecnico'})	
  })

  router.get("/page-bioquim",(req,res)=>{
    res.render("page-Bioquimico",{rol:'bioquimico'})	
  })
  //--------------------------------------------------------------------
  
  router.get("/",(req,res)=>{
    res.render("home")
  })
  router.get("/portal-paciente",(req,res)=>{
    
    res.render("accesoPaciente")
  })
  router.get("/portal-personal",(req,res)=>{
    
    res.render("accesoPersonal")
  })


  
  
  
  router.get("/page-create-orden/:id_persona",requireAuth,(req,res)=>{
    const {id_persona}=req.params
    let person

    personaController.buscarPorId(id_persona,p=>{
      person=p
    })
    let estados
    estadoController.list(est=>{
      estados=est
    })
    analisisController.obtenerAnalisis(listAnalisis =>{
      res.render('crearOrden',{id_persona,listAnalisis,person,estados})
    })
    
  })
  
 
////////////////////TOKEN////////////////////////////////////////////////








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
