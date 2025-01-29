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

      const [results] = await db.query(query, [usuarioId]);
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
      const [results] = await db.query(query, [usuarioId]);
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

  /****
   * @@@@@
   * Ruta para obtener transacciones con filtros.
   * @name get/filtradas
   * @function
   * @inner
   * @param {string} path - La ruta de la solicitud.
   * @param {callback} middleware - La función middleware de express.
   */
  router.get('/filtradas', async (req, res) => {
    const usuarioId = req.query.usuarioId;
    const { fechaInicio, fechaFin, tipo } = req.query;
    console.log('Obteniendo transacciones filtradas para usuarioId:', usuarioId);

    try {
      /****
       * @@@@@
       * Consulta SQL para obtener transacciones filtradas.
       * @param {string} usuarioId - El ID del usuario.
       * @param {string} [fechaInicio] - La fecha de inicio del filtro.
       * @param {string} [fechaFin] - La fecha de fin del filtro.
       * @param {string} [tipo] - El tipo de transacción.
       * @returns {Object[]} results - Los resultados de la consulta.
       */
      let query = 'SELECT * FROM transferencias WHERE usuario_id = ?';
      const params = [usuarioId];
      
      if (fechaInicio) {
        query += ' AND fecha >= ?';
        params.push(fechaInicio);
      }
      if (fechaFin) {
        query += ' AND fecha <= ?';
        params.push(fechaFin);
      }
      if (tipo) {
        query += ' AND tipo LIKE ?';
        params.push(`%${tipo}%`);
      }

      const [results] = await db.query(query, params);
      if (results.length > 0) {
        res.json(results);
      } else {
        res.status(404).json({ message: 'No se encontraron transacciones' });
      }
    } catch (err) {
      console.error('Error al obtener las transacciones filtradas:', err);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });

  /****
   * @@@@@
   * Ruta para realizar una transferencia.
   * @name post/transferencia
   * @function
   * @inner
   * @param {string} path - La ruta de la solicitud.
   * @param {callback} middleware - La función middleware de express.
   */
  router.post('/transferencia', async (req, res) => {
    const { cliente_id, tipo, monto, usuario_id } = req.body;
    console.log('Realizando transferencia para usuario_id:', usuario_id);

    /****
     * @@@@@
     * Consultas SQL para verificar el cliente e insertar la transferencia.
     * @param {string} cliente_id - El ID del cliente.
     * @param {string} tipo - El tipo de transacción.
     * @param {number} monto - El monto de la transferencia.
     * @param {string} usuario_id - El ID del usuario.
     * @returns {Object[]} resultsCliente - Los resultados de la consulta de verificación del cliente.
     * @throws {Error} Si ocurre un error durante la ejecución de las consultas.
     */
    const queryVerificarCliente = 'SELECT id FROM clientes WHERE id = ?';
    const queryInsertarTransferencia = 'INSERT INTO transferencias (cliente_id, tipo, monto, fecha, usuario_id) VALUES (?, ?, ?, NOW(), ?)';

    try {
      const [resultsCliente] = await db.query(queryVerificarCliente, [cliente_id]);
      if (resultsCliente.length === 0) {
        return res.status(400).json({ message: 'Cliente no encontrado' });
      }

      // Verificar el tipo y ajustar el monto si es necesario
      const montoAjustado = ['Pago', 'Retiro', 'Gasto'].includes(tipo) ? -monto : monto;

      await db.query(queryInsertarTransferencia, [cliente_id, tipo, montoAjustado, usuario_id]);
      res.status(201).json({ message: 'Transferencia realizada con éxito' });
    } catch (err) {
      console.error('Error al realizar la transferencia:', err);
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
