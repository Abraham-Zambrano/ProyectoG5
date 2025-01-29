/****
 * @@@@@
 * Autor: Zambrano Valverde Luis
 */

/****
 * @@@@@
 * Requiere el módulo jsonwebtoken.
 */
const jwt = require('jsonwebtoken');

/****
 * @@@@@
 * Middleware para verificar el token JWT.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {Function} next - La función next de express para continuar con el siguiente middleware.
 */
module.exports = (req, res, next) => {
  /****
   * @@@@@
   * Obtiene el token del encabezado de autorización.
   * @returns {string|null} token - El token JWT o null si no existe.
   */
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Token recibido:', token); // Log de depuración

  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  /****
   * @@@@@
   * Verifica el token JWT.
   * @param {string} token - El token JWT.
   * @param {string} secret - La clave secreta para verificar el token.
   * @param {Function} callback - La función de callback para manejar el resultado.
   */
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
