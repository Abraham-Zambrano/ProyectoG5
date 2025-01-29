/****
 * @@@@@
 * Autor: Zambrano Valverde Luis
 */

/****
 * @@@@@
 * Requiere la configuración de la base de datos desde el archivo db.
 */
const db = require('../config/db');

/****
 * @@@@@
 * Modelo de transacción para manejar operaciones de la base de datos.
 */
const transaccionModel = {
  /****
   * @@@@@
   * Realiza una transacción bancaria.
   * @async
   * @function realizarTransaccion
   * @param {Object} solicitud - La solicitud de transacción.
   * @param {number} solicitud.clienteId - El ID del cliente.
   * @param {number} solicitud.monto - El monto de la transacción.
   * @param {string} solicitud.descripcion - La descripción de la transacción.
   * @returns {Object} result - El resultado de la consulta de inserción.
   * @throws {Error} Si ocurre un error durante la ejecución de la consulta.
   */
  realizarTransaccion: async (solicitud) => {
    const { clienteId, monto, descripcion } = solicitud;

    const query = `
      INSERT INTO TransferenciaBancaria (clienteId, monto, descripcion, fecha) 
      VALUES (?, ?, ?, NOW())
    `;
    try {
      const [result] = await db.execute(query, [clienteId, monto, descripcion]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  /****
   * @@@@@
   * Obtiene el historial de transacciones de un cliente.
   * @async
   * @function obtenerHistorialTransacciones
   * @param {number} clienteId - El ID del cliente.
   * @returns {Object[]} rows - Las filas resultantes de la consulta.
   * @throws {Error} Si ocurre un error durante la ejecución de la consulta.
   */
  obtenerHistorialTransacciones: async (clienteId) => {
    const query = `
      SELECT * FROM TransferenciaBancaria 
      WHERE clienteId = ? ORDER BY fecha DESC
    `;
    try {
      const [rows] = await db.execute(query, [clienteId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }
};

/****
 * @@@@@
 * Exporta el modelo de transacción para ser usado en otros módulos.
 * @type {Object}
 */
module.exports = transaccionModel;
