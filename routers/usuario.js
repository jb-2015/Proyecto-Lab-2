const express = require('express');
const router = express.Router();
//const connection= require('../config/database')
const bcryptjs= require('bcryptjs')
const usuarioController = require('../controllers/usuarioController');
  // Utiliza el middleware requireAuth en tus rutas protegidas

  const { validarAutenticacion, handleErrorValidations } = require('../middleware/validateUser');
  const authMiddleware = require('../middleware/authMiddleware');


router.get('/formularioUsuario', (req, res) => {
    res.render('usuarioForm');
});
router.get('/reseteo_password',(req, res) => {
    res.render('reset-password-request'); // Ajusta el nombre de la vista según tu configuración
  });

router.post('/request-reset-password', usuarioController.requestResetPassword);


  router.get('/reset_password/:resetToken',(req, res) => {
    const resetToken = req.params.resetToken; // Obtén el token de la URL
    res.render('reset-password', { resetToken }); // Ajusta el nombre de la vista según tu configuración
  });

router.post('/resete_password', usuarioController.resetPassword);

  // A partir de aquí, puedes definir tus rutas normales
  

  router.post('/auth', validarAutenticacion, handleErrorValidations, async (req, res) => {
   
        try {
        const { dni, clave } = req.body;

        let usuario;

            usuario = await usuarioController.buscarDni(dni);
    
        if (usuario === null) {

           return res.json({
                ok: false,

                error: "Documento no esta registrado"
              
            });

        }else{

        const esClaveValida = await bcryptjs.compare(clave.toString(), usuario.clave);

        if (!esClaveValida) {
            res.json({
                ok: false,
                error: "Contraseña incorrecta"
            });
            return;
        }

        req.session.user = usuario.id_usuario;
console.log(usuario.rol)
        
		if (usuario.rol === 'Paciente') {
			res.json({
				ok: true,
				//redirectTo: ''
                rol: usuario.rol
			});
		} else if (usuario.rol === 'Administrador' && usuario.estado != 0) {
			res.json({
				ok: true,
                redirectTo: `/page-${usuario.rol}`,
                rol: usuario.rol
			});
		}else if (usuario.rol === 'Tecnico' && usuario.estado != 0) {
			res.json({
				ok: true,
				redirectTo: `/page-${usuario.rol}`
			});
		}else if (usuario.rol === 'Bioquimico'&& usuario.estado != 0) {
			res.json({
				ok: true,
				redirectTo: `/page-${usuario.rol}`
			});
		}else if (usuario.rol === 'Gerente'&& usuario.estado != 0) {
			res.json({
				ok: true,
				redirectTo: `/page-${usuario.rol}`
			});
		}
    }
    } catch (error) {
        console.error(error);
        return res.json({
            ok: false,
            error: "Error en el servidor"
        });
    }
});

router.post('/pacienTe', validarAutenticacion, handleErrorValidations, async (req, res) => {
    
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
		if (usuario.rol === 'Paciente') {
			res.json({
				ok: true,
				redirectTo: `/page-${usuario.rol}`
			});
		} else if (usuario.rol === 'Administrador') {
			res.json({
				ok: true,
				//redirectTo: '/page-administrativo'
			});
		}else if (usuario.rol === 'Técnico') {
			res.json({
				ok: true,
			//	redirectTo: '/page-Tecnico'
			});
		}else if (usuario.rol === 'Bioquímico') {
			res.json({
				ok: true,
				//redirectTo: '/page-bioquim'
			});
		}else if (usuario.rol === 'Gerente') {
			res.json({
				ok: true,
				//redirectTo: `/page-${usuario.rol}`
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


router.get('/', authMiddleware.requireAuth, usuarioController.list);
router.get('/:id', authMiddleware.requireAuth, usuarioController.getById);


router.post('/guardarUsuario' , authMiddleware.requireAuth, usuarioController.saveUser);
router.get('/busqDni/:dni', authMiddleware.requireAuth, usuarioController.buscarDni)
router.get('/tabla_Empleado/empleado' , authMiddleware.requireAuth ,  usuarioController.tablaEmpleado)
router.get('/listaPaciente/userPa/:rol' , authMiddleware.requireAuth,  usuarioController.listPaciente)
router.get('/cambioAlta/user/:dni' , authMiddleware.requireAuth, usuarioController.btnAlta);
router.get('/cambioBaja/user/:dni', authMiddleware.requireAuth , usuarioController.btnBaja);
router.get('/modificarRol/user/:dni/:rol', authMiddleware.requireAuth, usuarioController.modificarRol);

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
