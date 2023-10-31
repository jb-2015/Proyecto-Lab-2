const express = require('express');
const router = express.Router();
//const connection= require('../config/database')
const bcryptjs= require('bcryptjs')
const usuarioController = require('../controllers/usuarioController');
const { body, validationResult } = require('express-validator');
router.get('/formularioUsuario', (req, res) => {
    res.render('usuarioForm');
});


  // Utiliza el middleware requireAuth en tus rutas protegidas

 

  // A partir de aquí, puedes definir tus rutas normales
  

router.post('/auth',async (req, res) => {
    
        try {
        const { dni, clave } = req.body;

        const usuario = await usuarioController.buscarDni(dni);

        if (!usuario) {
            res.json({
                ok: false,
                error: "Usuario y/o Contraseña h incorrectos"
              
            });

        }

        const esClaveValida = await bcryptjs.compare(clave.toString(), usuario.clave);

        if (!esClaveValida) {
            res.json({
                ok: false,
                error: "Usuario y/o Contraseña jj incorrectos"
            });
            return;
        }

        req.session.user = usuario.id_usuario;
        console.log(req.session.user);
        
		if (usuario.rol === 'paciente') {
			res.json({
				ok: true,
				//redirectTo: ''
			});
		} else if (usuario.rol === 'administrativo') {
			res.json({
				ok: true,
                redirectTo: `/page-${usuario.rol}`
			});
		}else if (usuario.rol === 'tecnico') {
			res.json({
				ok: true,
				redirectTo: '/page-Tecnico'
			});
		}else if (usuario.rol === 'bioquimico') {
			res.json({
				ok: true,
				redirectTo: '/page-bioquim'
			});
		}
    } catch (error) {
        console.error(error);
        res.json({
            ok: false,
            error: "Error en el servidor"
        });
    }
});

router.post('/pacienTe', async(req, res)=>{


    const { dni, clave } = req.body;

    try {
        const usuario = await usuarioController.buscarDni(dni);

        if (!usuario) {
            res.json({
                ok: false,
                error: "Usuario y/o Contraseña incorrectos"
            });
            return;
        }

        const esClaveValida = await bcryptjs.compare(clave.toString(), usuario.clave);

        if (!esClaveValida) {
            res.json({
                ok: false,
                error: "Usuario y/o Contraseña incorrectos"
            });
            return;
        }
		if (usuario.rol === 'paciente') {
			res.json({
				ok: true,
				redirectTo: '/page-paciente'
			});
		} else if (usuario.rol === 'admin') {
			res.json({
				ok: true,
				//redirectTo: '/page-administrativo'
			});
		}else if (usuario.rol === 'tecnico') {
			res.json({
				ok: true,
			//	redirectTo: '/page-Tecnico'
			});
		}else if (usuario.rol === 'bioquimico') {
			res.json({
				ok: true,
				//redirectTo: '/page-bioquim'
			});
		}
    } catch (error) {
        console.error(error);
        res.json({
            ok: false,
            error: "Error en el servidor"
        });
    }
});


router.get('/', usuarioController.list);
router.get('/:id', usuarioController.getById);


router.post('/guardarUsuario',usuarioController.saveUser);
router.get('/busqDni/:dni', usuarioController.buscarDni)



/*
router.put('/campos', [
    body('dni', 'Ingrese el Numero de Documento')
    .exists()
    .isNumeric()
    .isLength(6),
    body('clave','Ingrese clave minimo 6 carecteres')
   
    .exists()
    .isLength({ min:6})
], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
		console.log( errors.msg)
		const valores= req.body
		const validaciones=errors.array()
        res.render('accesoPersonal',{ errors: validationResult(req).array(),valores: valores });
        
    }else{
		res.send('Validacion exitosa')
	}
})
*/







module.exports = router;
