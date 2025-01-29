/****
 * @@@@@
 * Autor: Zambrano Valverde Luis
 */

/****
 * @@@@@
 * Requiere el módulo express.
 */
const express = require('express');

/****
 * @@@@@
 * Función para crear un enrutador de autenticación.
 * @param {Object} db - La conexión a la base de datos.
 * @returns {Router} router - El enrutador de express.
 */
const createAuthRouter = (db) => {
  const router = express.Router();

  /****
   * @@@@@
   * Ruta para manejar el inicio de sesión.
   * @name post/login
   * @function
   * @inner
   * @param {string} path - La ruta de la solicitud.
   * @param {callback} middleware - La función middleware de express.
   */
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Intentando iniciar sesión con email:', email);

    try {
      /****
       * @@@@@
       * Consulta SQL para verificar el usuario.
       * @param {string} email - El correo electrónico del usuario.
       * @param {string} password - La contraseña del usuario.
       * @returns {Object[]} results - Los resultados de la consulta.
       */
      const query = 'SELECT id, email FROM usuarios WHERE email = ? AND password = ?';
      console.log('Ejecutando consulta:', query);

      const [results] = await db.query(query, [email, password]);
      if (results.length > 0) {
        const user = results[0];
        // En caso de generar tokens JWT
        const token = generateToken(user);
        res.json({ token, user });
      } else {
        res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });

  /****
   * @@@@@
   * Función para generar tokens JWT.
   * @param {Object} user - El objeto del usuario.
   * @returns {string} token - El token JWT generado.
   */
  function generateToken(user) {
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    return token;
  }

  return router;
};

/****
 * @@@@@
 * Exporta la función createAuthRouter para ser usada en otros módulos.
 * @type {function}
 */
module.exports = createAuthRouter;
