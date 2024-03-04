
const express = require('express');
const router = express.Router();
const analisisController = require('../controllers/analisisController');
const authMiddleware = require('../middleware/authMiddleware');
router.get('/', authMiddleware.requireAuth, analisisController.obtenerAnalisis);
router.get('/buscar-id/:id',authMiddleware.requireAuth,(req,res)=>{
    const {id} =req.params;

    analisisController.buscarPorId(id,(data)=>{
        if(data.OK){
            res.json({analisis:data.analisis,muestras:data.muestras})
        }else{
            res.send('No se encontro el analisis')
        }
    })
})

module.exports = router;
