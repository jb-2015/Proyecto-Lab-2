

const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const router = express.Router();

const analisisController= require('../controllers/analisisController')
const pedidoController= require('../controllers/pedidoController')
const personaController= require('../controllers/personaController')
const estadoController = require('../controllers/estadoController')
const ordenController = require('../controllers/ordenController')
const examenController= require('../controllers/examenController')
const usuarioController = require('../controllers/usuarioController')
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const userValidationMiddleware = require('../middleware/validateUser');
const muestraController = require('../controllers/muestraController');

//IMPORTAR EL MODELO PARA EL REGISTRO DE VALORES
  const RegistroValores= require('../models/registro_valores')
//*********************************** */

  
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
    cookie: {
      secure: false, // Configurar a true si estás usando HTTPS
      httpOnly: true,
      // maxAge: null,  // Comentar o eliminar esta línea para una cookie de sesión de navegador
    }
}))





  
  // Utiliza el middleware checkIncognito antes de tus rutas
  router.use(authMiddleware.checkIncognito);
//router.get('/cerrar-sesion', cerrarSesion);
router.get('/cerrar-sesion', authMiddleware.requireAuth, authMiddleware.cerrarSesion);
// Utiliza el middleware de validación de usuario por DNI antes de las rutas que requieren autenticación
//router.use(userValidationMiddleware.validateUsuarioPorDNI);

// Utiliza el middleware de manejo de errores de validación
//router.use(userValidationMiddleware.handleErrorValidations);
/**ACA VA A ENTRAR CUANDO SE HAGA UN INICIO DE SESION */

router.get("/page-Gerente",authMiddleware.requireAuth, async(req,res)=>{
  try {
    const resultadosAltas = await usuarioController.tablaEmpleado();
    //const resultadoForm= await usuarioController.formuEmpleado()
    const rolesDisponibles = ['Administrador', 'Tecnico', 'Bioquimico', 'Gerente'];
    
    res.render("page-Gerente", { rol: 'Gerente', resultadosAltas,rolesDisponibles });
    //res.render("modificarPersona",{rol: 'gerente', resultadosAltas})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

  router.get('/page-Administrador', authMiddleware.requireAuth,(req, res) => {
    res.render("page-administrativo",{rol:'Administrador'})	
    

  });
  
  router.get("/page-Paciente",authMiddleware.requireAuth,(req,res)=>{
    res.render("page-Paciente",{rol:'Paciente'})	
  })


  router.get("/page-Tecnico",authMiddleware.requireAuth, async(req,res)=>{
    try {
      const ordenes = await new Promise((resolve, reject) => {
          ordenController.buscarPorEstado(2, (ordenes) => {
              resolve(ordenes);
          });
      });

      const ordenes2 = await new Promise((resolve, reject) => {
          ordenController.buscarPreinfo((ordenes2) => {
              resolve(ordenes2);
          });
      });

      res.render("page-Tecnico", { rol: 'Tecnico', ordenes, ordenes2 });
   //   res.json({ordenes, ordenes2})
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
  })

  router.get("/page-Bioquimico",authMiddleware.requireAuth,(req,res)=>{
    ordenController.buscarParaValidar(ordenes=>{
    res.render("page-Bioquimico",{rol:'Bioquimico',ordenes})	
  })
  })
  //--------------------------------------------------------------------
  
  router.get("/",(req,res)=>{
    res.render("home")
  })
  router.get("/portal-paciente",(req,res)=>{
    
    res.render("accesoPaciente")
  })
  router.get("/portal-personal", (req, res) => {
  
    res.render("accesoPersonal");
});


  
  
  
  router.get("/page-create-orden/:id_persona/:rol",authMiddleware.requireAuth, async (req,res)=>{
    const {id_persona}=req.params
    const {rol}=req.params
    let person

    await  personaController.buscarPorId(id_persona,p=>{
      person=p
    })
    let estados
    await estadoController.list(est=>{
      estados=est
    })
    await analisisController.obtenerAnalisis(listAnalisis =>{
      res.render('crearOrden',{id_persona,listAnalisis,person,estados,rol})
    })
    
  })
  router.get("/page_orden/create/:id/:rol",authMiddleware.requireAuth, async (req,res)=>{
    const {id_persona}=req.params
    const { id } = req.params;
    const { rol } = req.params;
const muestra= await muestraController.obtenerMuestra(id)

 const orden= await ordenController.actualizarOrden(id,rol)

    let estados
    await estadoController.list(est=>{
      estados=est
    })
    await analisisController.obtenerAnalisis(listAnalisis =>{
      res.render('actualizarOrden2',{id_persona,listAnalisis,orden,muestra,estados,rol})
    })
    
  })
  router.post("/guardar-valores",authMiddleware.requireAuth,(req,res)=>{
      const {id_determinacion,id_examen,valor} = req.body

      const nuevoRegistro= {
        id_determinacion: id_determinacion,
        id_examen: id_examen,
        valor:valor
      }

      RegistroValores.create(nuevoRegistro)
      .then(result=>{
        console.log("Se creo el registro con id: "+res.id_reg)
        res.json({OK:true})
      })


  })
  
 
////////////////////REGISTRAR VALORES////////////////////////////////////////////////

router.get('/registrar-valores/:id/:genero/:rol',authMiddleware.requireAuth,async (req,res)=>{
  const {id} = req.params
  const {genero} = req.params
  const {rol} = req.params
  try {
    await examenController.getForReg(id, genero, (examen, determinacion, valor_Ref) => {
      if (examen && examen.orden && examen.orden.pedido && examen.orden.pedido.persona) {
        const persona = examen.orden.pedido.persona.get({ plain: true });
        console.log("PERSONA: " + persona.genero);

     res.render('registrar_valores',{examen, determinacion, valor_Ref, persona,rol})
        /*
     res.json({
          ok: true,
          persona: persona,
          examen: examen,
          determinacion: determinacion,
          valor_Ref: valor_Ref
        });
      } else {
        res.json({
          ok: false,
          error: 'No se encontraron datos relacionados con el examen proporcionado.'
        });
        */
      }
      
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.json({
      ok: false,
      error: 'Error en el servidor al procesar la solicitud.'
    });
  }
});

router.get('/registrar-valoresPreInfo/:id/:genero',authMiddleware.requireAuth,async (req,res)=>{
  const {id} = req.params
  const {genero} = req.params
  try {
    await examenController.getPreInfo(id, genero, (examen, determinacion, valor_Ref, registroDeValor) => {
      if (examen && examen.orden && examen.orden.pedido && examen.orden.pedido.persona) {
        const persona = examen.orden.pedido.persona.get({ plain: true });
        console.log("PERSONA: " + persona.id_persona);

     res.render('registroValorPreInfo',{examen, determinacion, valor_Ref, persona, registroDeValor})
        /*
     res.json({
          ok: true,
          persona: persona,
          examen: examen,
          determinacion: determinacion,
          valor_Ref: valor_Ref,
          registroDeValor: registroDeValor
        });
      } else {
        res.json({
          ok: false,
          error: 'No se encontraron datos relacionados con el examen proporcionado.'
        });
         */
      }
      
    });
  } catch (error) {
    console.error('Error:', error);
    res.json({
      ok: false,
      error: 'Error en el servidor al procesar la solicitud.'
    });
  }
});








  ///Eduardo/////////////////////////////////////////////////////////////////
  const consultaController = require('../db/consulta');
  router.get('/pacienTec',authMiddleware.requireAuth, consultaController.realizarConsulta);
  router.get('/orden/:id', authMiddleware.requireAuth,consultaController.obtenerResultados);
  router.get('/nueva-orden',authMiddleware.requireAuth, (req, res) => {
    
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
const RegistroValorRouter= require('./registrovalor');
const cambioClaveRouter= require('./cambioClave');
const { resetWatchers } = require('nodemon/lib/monitor/watch');
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
router.use('/registrovalor', RegistroValorRouter);
router.use('/cambioClave', cambioClaveRouter);

module.exports = router;
