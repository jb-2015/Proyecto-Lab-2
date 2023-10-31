const express = require('express');
const router = express.Router();


const personaController = require('../controllers/personaController');



const session =require('express-session')
router.use(session({
	secret: 'secret',
	resave: false,
    saveUninitialized: true,
    
}))
function requireAuth(req, res, next) {
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







router.get('/', personaController.list);
router.put('/update/:id', personaController.update);
router.put('/create', personaController.create);
router.get('/remove/:id', personaController.remove);
router.get('/id/:id', personaController.findById);
router.get('/urldni/:dni', personaController.findByDni);
router.get('/nombre/:nombre', personaController.findByNombre);

router.get('/apellido/:apellido', personaController.findByApellido);
router.get('/email/:email', personaController.findByEmail);
router.get('/cantidad', personaController.obtenerCantidadTotal);
router.get('/per', personaController.obtenerDatosPersonasConOrdenes);
router.get('/nueva', (req, res) => {
    res.render('createPaciente');
});

router.get('/tabla', personaController.tabla);
//router.get('/dni/:dni', personaController.findByDni);
/*
router.post("/panel-paciente",async (req,res)=>{
    try {
        const dni = req.body.dni; // Supongo que el DNI está en req.body.dni
        const persona = await personaController.findByDni(dni);

        if (persona) {
          res.render('panelPaciente', { persona });
        } else {
            res.status(404).json({ error: 'Persona no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
*/

router.get('/panel-te/:dni',requireAuth, personaController.renderDni);

module.exports = router;
