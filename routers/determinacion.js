const express = require('express');
const router = express.Router();
const determinacionController = require('../controllers/determinacionController');
const examenController = require('../controllers/examenController');
const authMiddleware = require('../middleware/authMiddleware');
const { Op } = require('sequelize');
const ValorRef = require('../models/valor_ref');
//router.get('/', determinacionController.list);
//router.get('/:id', determinacionController.getById);
const Registro_valores = require('../models/registro_valores')
router.get('/paraValidar/:id_examen/:genero/:id_orden/:rol', determinacionController.obtenerResultadoExamen);
router.get('/cargarValor/:id_orden',authMiddleware.requireAuth, determinacionController.obtenerDeter);

router.get('/resultados-examenes/:id_examenesArray/:genero/:id_orden/:rol',determinacionController.obtenerMasDeUnResultadoExamen);

router.get('/resultFinal/:rol', (req, res) => {
  
  const { rol } = req.params;
  res.render('resultFinal',{rol}); // Renderiza la página resultFinal.ejs
});
/*
router.get('/paraValidar/:id_orden/:genero_persona',async (req,res)=>{
    const {id} = req.params
    const {genero} = req.params
    try {
      await examenController.getForReg(id, genero, (examen, determinacion, valor_Ref) => {
        if (examen && examen.orden && examen.orden.pedido && examen.orden.pedido.persona) {
          const persona = examen.orden.pedido.persona.get({ plain: true });
          console.log("PERSONA: " + persona.genero);
  
       res.render('vistaExaYdeter',{examen, determinacion, valor_Ref, persona})
         
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
  
*/
module.exports = router;