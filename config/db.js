/****
 * @@@@@
 * Configura la conexión a la base de datos MySQL usando mysql2/promise.
 * @module db
 */

/****
 * @@@@@
 * Requiere el módulo mysql2/promise.
 */
const mysql = require('mysql2/promise');

/****
 * @@@@@
 * Crea un grupo de conexiones a la base de datos con los parámetros proporcionados.
 * @type {Pool}
 * @property {string} host - La dirección del host de la base de datos.
 * @property {string} user - El usuario de la base de datos.
 * @property {string} password - La contraseña del usuario de la base de datos.
 * @property {string} database - El nombre de la base de datos.
 */
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

/****
 * @@@@@
 * Exporta el grupo de conexiones para ser usado en otros módulos.
 */
module.exports = db;
