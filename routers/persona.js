const express = require('express');
const router = express.Router();


const personaController = require('../controllers/personaController');
const authMiddleware = require('../middleware/authMiddleware');


router.use(authMiddleware.checkIncognito);

router.get('/',authMiddleware.requireAuth, personaController.list);
router.put('/update/:id',authMiddleware.requireAuth, personaController.update);
router.put('/perso/:dni',authMiddleware.requireAuth, personaController.updateDni);
router.put('/create',authMiddleware.requireAuth, personaController.create);
router.get('/remove/:id',authMiddleware.requireAuth, personaController.remove);
router.get('/id/:id',authMiddleware.requireAuth, personaController.findById);
router.get('/urldni/:dni', personaController.findByDni);
router.get('/nombre/:nombre',authMiddleware.requireAuth, personaController.findByNombre);

router.get('/apellido/:apellido',authMiddleware.requireAuth, personaController.findByApellido);
router.get('/email/:email',authMiddleware.requireAuth, personaController.findByEmail);
router.get('/cantidad',authMiddleware.requireAuth, personaController.obtenerCantidadTotal);
router.get('/per', authMiddleware.requireAuth,personaController.obtenerDatosPersonasConOrdenes);
router.get('/nueva/:rol', authMiddleware.requireAuth, (req, res) => {
    const {role} = req.params
    res.render('createPaciente',rol);
});

router.get('/tabla', authMiddleware.requireAuth,personaController.tabla);
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

router.get('/panel-te/:dni/:rol',authMiddleware.requireAuth,personaController.renderDni);

router.get('/porEmail/userEmail/:email',authMiddleware.requireAuth,personaController.renderEmail);
module.exports = router;
