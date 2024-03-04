const registro_valores = require('../models/registro_valores')

const updateRg = async (req, res) => {
    const { id } = req.params; 
    const { valor } = req.body; // Nuevos datos
  
    try {
      const updatedRegVal = await registro_valores.update({
        valor
      }, {
        where: { id_determinacion: id }
      }
      
      );
  
      if (updatedRegVal[0] === 1) {
        res.status(200).json({ message: 'Registro de valor actualizado correctamente' });
      } else {
        res.status(404).json({ error: 'Registro de valor no actualizado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
module.exports = {
    updateRg
  };