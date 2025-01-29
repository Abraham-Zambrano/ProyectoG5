/****
 * @@@@@
 * Autor: Zambrano Valverde Luis
 */

/****
 * @@@@@
 * Requiere los módulos jsonwebtoken y bcryptjs.
 */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/****
 * @@@@@
 * Requiere la configuración de la base de datos desde el archivo db.
 */
const db = require('../config/db'); // configuración de la base de datos

/****
 * @@@@@
 * Función para manejar el inicio de sesión de un usuario.
 * @async
 * @function loginUser
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    /****
     * @@@@@
     * Buscar el usuario en la base de datos.
     * @param {string} email - El correo electrónico del usuario.
     * @returns {Array} user - El resultado de la consulta.
     */
    const user = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (user.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    /****
     * @@@@@
     * Verificar la contraseña del usuario.
     * @param {string} password - La contraseña proporcionada por el usuario.
     * @param {string} userPassword - La contraseña almacenada en la base de datos.
     * @returns {boolean} validPassword - Si la contraseña es válida.
     */
    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    /****
     * @@@@@
     * Crear y devolver un token JWT para el usuario autenticado.
     * @param {Object} payload - Los datos del usuario a incluir en el token.
     * @param {string} secret - La clave secreta para firmar el token.
     * @param {Object} options - Opciones adicionales para el token.
     * @returns {string} token - El token JWT.
     */
    const token = jwt.sign(
      { id: user[0].id, email: user[0].email },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

/****
 * @@@@@
 * Exporta la función loginUser para ser usada en otros módulos.
 * @type {function}
 */
module.exports = { loginUser };
