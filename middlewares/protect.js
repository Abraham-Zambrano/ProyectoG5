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
 * Middleware para proteger rutas verificando el token JWT.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {Function} next - La función next de express para continuar con el siguiente middleware.
 */
const protect = (req, res, next) => {
  /****
   * @@@@@
   * Obtiene el token del encabezado de autorización.
   * @returns {string|null} token - El token JWT o null si no existe.
   */
  const token = req.header('Authorization')?.split(' ')[1]; // Obtener el token desde el header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    /****
     * @@@@@
     * Verifica el token JWT.
     * @param {string} token - El token JWT.
     * @param {string} secret - La clave secreta para verificar el token.
     * @returns {Object} decoded - La información decodificada del token.
     */
    const decoded = jwt.verify(token, 'your-secret-key');
    req.user = decoded; // El token contiene el usuario, lo agregamos a la solicitud
    next(); // Pasar al siguiente middleware o ruta
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

/****
 * @@@@@
 * Exporta el middleware protect para ser usado en otros módulos.
 * @type {function}
 */
module.exports = protect;
