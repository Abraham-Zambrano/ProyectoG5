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
 * Función para crear un enrutador de transacciones.
 * @param {Object} db - La conexión a la base de datos.
 * @returns {Router} router - El enrutador de express.
 */
const createTransaccionesRouter = (db) => {
  const router = express.Router();

  /****
   * @@@@@
   * Ruta para obtener el resumen de la cuenta de un usuario.
   * @name get/resumen
   * @function
   * @inner
   * @param {string} path - La ruta de la solicitud.
   * @param {callback} middleware - La función middleware de express.
   */
  router.get('/resumen', async (req, res) => {
    const usuarioId = req.query.usuarioId;
    console.log('Obteniendo resumen de la cuenta para usuarioId:', usuarioId);

    try {
      /****
       * @@@@@
       * Consulta SQL para obtener el resumen de la cuenta.
       * @param {string} usuarioId - El ID del usuario.
       * @returns {Object[]} results - Los resultados de la consulta.
       */
      const query = `
        SELECT 
          SUM(monto) AS saldo, 
          SUM(CASE WHEN monto > 0 THEN monto ELSE 0 END) AS ingresos, 
          SUM(CASE WHEN monto < 0 THEN monto ELSE 0 END) AS gastos 
        FROM transferencias 
        WHERE usuario_id = ?`;

      console.log('Ejecutando consulta:', query);

      const [results] = await db.query(query, [usuarioId]);
      console.log('Resultados de la consulta de resumen:', results);

      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ message: 'No se encontró el resumen de la cuenta' });
      }
    } catch (err) {
      console.error('Error al obtener el resumen de la cuenta:', err);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });

  /****
   * @@@@@
   * Ruta para obtener todas las transacciones de un usuario.
   * @name get/todas
   * @function
   * @inner
   * @param {string} path - La ruta de la solicitud.
   * @param {callback} middleware - La función middleware de express.
   */
  router.get('/todas', async (req, res) => {
    const usuarioId = req.query.usuarioId;
    console.log('Obteniendo todas las transacciones para usuarioId:', usuarioId);

    try {
      /****
       * @@@@@
       * Consulta SQL para obtener todas las transacciones.
       * @param {string} usuarioId - El ID del usuario.
       * @returns {Object[]} results - Los resultados de la consulta.
       */
      const query = 'SELECT * FROM transferencias WHERE usuario_id = ?';
      console.log('Ejecutando consulta:', query);

      const [results] = await db.query(query, [usuarioId]);
      console.log('Resultados de la consulta de todas las transacciones:', results);

      if (results.length > 0) {
        res.json(results);
      } else {
        res.status(404).json({ message: 'No se encontraron transacciones' });
      }
    } catch (err) {
      console.error('Error al obtener todas las transacciones:', err);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });

  return router;
};

/****
 * @@@@@
 * Exporta la función createTransaccionesRouter para ser usada en otros módulos.
 * @type {function}
 */
module.exports = createTransaccionesRouter;
