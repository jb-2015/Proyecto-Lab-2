// middleware/authMiddleware.js

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
      res.redirect('/portal-personal');
    } else {
      next(); // Si no es incógnito, continúa con la siguiente ruta o middleware
    }
  }
  function cerrarSesion(req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error al cerrar sesión:", err);
            res.status(500).send("Error al cerrar sesión");
        } else {
            res.redirect('/'); // Puedes redirigir a donde prefieras
        }
    });
}
  module.exports = { requireAuth, checkIncognito, cerrarSesion };
  