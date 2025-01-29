/*
 * Autor: Zambrano Valverde Luis 
 */
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Token recibido:', token); // Log de depuración

  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Error al verificar el token:', err); // Log de error
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }

    console.log('Token decodificado:', decoded); // Log de éxito
    req.user = decoded; // Almacena la información del usuario 
    next();
  });
};
