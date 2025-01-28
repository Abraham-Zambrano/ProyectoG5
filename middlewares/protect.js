/*
 * Autor: Zambrano Valverde Luis 
 */
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  // Obtener el token desde el header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    req.user = decoded;  // El token contiene el usuario, lo agregamos a la solicitud
    next();  // Pasar al siguiente middleware o ruta
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = protect;
