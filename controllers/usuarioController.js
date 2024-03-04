const Usuario = require('../models/usuario');
const  Persona  = require('../models/persona');
const bcryptjs= require('bcryptjs')
const crypto = require('crypto');
const {sendResetPasswordEmail} = require('../config/nodemailer');

const list = async (req, res) => {
  try {
    const usuario = await Usuario.findAll();
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'Usuario no EEEE encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const saveUser=async (req, res) => {

  const { dni, clave, rol } = req.body;
 
  
    
  try {
    const usuarioExistente = await Usuario.findOne({ where: { dni: dni } });

    if (usuarioExistente) {
      return res.status(400).json({ message: 'El DNI ya está registrado' });
    }

     let passwordHaash= await bcryptjs.hash(clave, 8)
      const usuario =  Usuario.create({
          dni: dni,
          clave:passwordHaash,
          rol:rol,
         estado:0,

      });

      res.status(201).json({ message: 'Persona creada correctamente' });
  } catch (error) {
      res.status(500).send('Error al guardar el usuario');
  }

};


const buscarDni = async (numeroDeDNI) => {
  const usuarioEncontrado = await Usuario.findOne({
    where: { dni: numeroDeDNI }
  });

  if (usuarioEncontrado) {
    return usuarioEncontrado;
  } else {
   
    return null; // Otra opción podría ser retornar un objeto o valor específico para indicar que no se encontró el usuario
  }
};

const postUser = async (numeroDeDNI) => {
  const { dni, clave, rol, estado } = req.body;
  let passwordHaash= await bcryptjs.hash(clave, 8)
const usuario= await Usuario.save({
  
  dni,
  clave:passwordHaash,
  rol,
  estado

})

res.json({
"message":"post api",
usuario
})

};


const requestResetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Busca la persona por correo electrónico
    const persona = await Persona.findOne({ where: { email: email } });

    if (!persona) {
      return res.status(404).json({ message: 'Persona no encontrada' });
    }
    // Busca el usuario asociado a la persona por su dni
    const usuario = await Usuario.findOne({ where: { dni: persona.dni } });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Generar y guardar un token único (puedes usar algún paquete como `crypto` para esto)

    const resetToken = crypto.randomBytes(5).toString('hex');
    usuario.resetToken = resetToken;
    await usuario.save();

    // Enviar el correo con el enlace de restablecimiento
    await sendResetPasswordEmail(email, resetToken);

     res.redirect('/');
    //res.status(200).send('Correo enviado con tremendo éxito');
  
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { resetToken: resetToken } });

    if (!usuario) {
      return res.status(404).json({ message: 'Token no válido o ha expirado' });
    }

    // Actualizar la contraseña y eliminar el token de restablecimiento
    usuario.clave = await bcryptjs.hash(newPassword, 8);
    usuario.resetToken = null;
    await usuario.save();
 // res.render('reset-password');
 res.redirect('/');
     // res.status(200).json({ message: 'Contraseña restablecida con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const tablaEmpleado = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: ['id_usuario', 'dni', 'rol', 'estado'],
      where: {
        rol: ['Administrador', 'Técnico', 'Bioquímico'],
      },
    });

    // Array para almacenar los resultados
    const resultados = [];

    // Iterar sobre cada usuario
    for (const usuario of usuarios) {
      // Obtener la información de la persona para cada usuario
      const persona = await obtenerInformacionPersona(usuario.dni);
      
      // Agregar resultado al array
      resultados.push({
        usuario: usuario,
        persona: persona,
      });
    }
/*
    res.json({
      ok: true,
      resultados: resultados,
    });
    */
   return resultados
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listPaciente = async (req, res) => {
  const {rol} = req.params;

  try {
    const usuarios = await Usuario.findAll({
      attributes: ['id_usuario', 'dni', 'rol', 'estado'],
      where: {
     //   dni: dni,
        rol: [,'Administrador', 'Técnico', 'Bioquímico','Paciente'],
      },
    });

   
    const resultadosForm = [];

      
      for (const usuario of usuarios) {
        // Obtener la información de la persona para cada usuario
        const persona = await obtenerInformacionPersona(usuario.dni);
        
        // Agregar resultado al array
        resultadosForm.push({
          usuario: usuario,
          persona: persona,
        });
      }
/*
    res.json({
      ok: true,
      resultadosForm: resultadosForm,
    });
  */
res.render('modificarPersona',{resultadosP:resultadosForm, rol})
  //return resultadosForm
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const obtenerInformacionPersona = async (dni) => {
  try {
    // Buscar la persona por el dni
    const persona = await Persona.findOne({
      attributes: ['id_persona','nombre', 'apellido', 'dni','genero','embarazada', 'fecha_nacimient','direccion', 'email', 'tel'],
      where: {
        dni: dni,
      },
    });

    return persona;
  } catch (error) {
    throw new Error('Error al obtener información de la persona: ' + error.message);
  }
};


const btnAlta= async (req, res)=>{
  try{
    const {dni} = req.params;
  
    await Usuario.update(
      { estado: 1 },
      { where: { dni: dni } }
    );
    res.json({ success: true });
  }catch(error){
    res.status(500).json({ error: 'Internal Server Error' });
    res.json(false)
  }
  }




  const btnBaja= async (req, res)=>{
    const {dni} = req.params;
    try{
      await Usuario.update(
        { estado: 0 },
        { where: { dni: dni } }
      );
      res.json({ success: true });

    }catch(error){
      res.status(500).json({ error: 'Internal Server Error' });
      res.json(false)
    }
    }
    
    const modificarRol= async (req, res)=>{
      const {dni} = req.params;
      const {rol} = req.params;
      try{
        await Usuario.update(
          { rol: rol },
          { where: { dni: dni } }
        );
        res.json({ success: true });
  
      }catch(error){
        res.status(500).json({ error: 'Internal Server Error' });
        res.json(false)
      }
      }
module.exports = {
  modificarRol,
  btnAlta,
  btnBaja,
  tablaEmpleado,
  listPaciente,
  resetPassword,
  requestResetPassword,
  sendResetPasswordEmail,
  buscarDni,
  saveUser,
  list,
  getById,
  postUser,

};
