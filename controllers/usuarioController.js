const Usuario = require('../models/usuario');

const bcryptjs= require('bcrypt')

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

  const { dni, clave, rol, estado } = req.body;
 
  
    
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
          estado:estado,

      });

      res.status(201).json({ message: 'Persona creada correctamente' });
  } catch (error) {
      res.status(500).send('Error al guardar el usuario');
  }

};


const buscarDni = async (numeroDeDNI) => {
  try {
    const usuarioEncontrado = await Usuario.findOne({
      where: { dni: numeroDeDNI }
    });
    return usuarioEncontrado;
  } catch (error) {
    console.error('Error al buscar el usuario:', error);
    throw error; // Importante: Debes propagar el error
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

}



module.exports = {
  buscarDni,
  saveUser,
  list,
  getById,
  postUser,
};
