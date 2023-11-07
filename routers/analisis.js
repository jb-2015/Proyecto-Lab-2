
const express = require('express');
const router = express.Router();
const analisisController = require('../controllers/analisisController');

router.get('/', analisisController.obtenerAnalisis);
router.get('/buscar-id/:id',(req,res)=>{
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
