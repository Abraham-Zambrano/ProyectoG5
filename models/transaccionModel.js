/*
 * Autor: Zambrano Valverde Luis 
 */
const db = require('../config/db');

const transaccionModel = {
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
//Query a MySQl
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

module.exports = transaccionModel;
