/*
 * Autor: Zambrano Valverde Luis 
 */
const express = require('express');

const createTransaccionesRouter = (db) => {
  const router = express.Router();

  // Ruta para obtener el resumen de la cuenta
  router.get('/resumen', async (req, res) => {
    const usuarioId = req.query.usuarioId;
    console.log('Obteniendo resumen de la cuenta para usuarioId:', usuarioId);

    try {
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

  // Ruta para obtener todas las transacciones
  router.get('/todas', async (req, res) => {
    const usuarioId = req.query.usuarioId;
    console.log('Obteniendo todas las transacciones para usuarioId:', usuarioId);

    try {
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

  // Ruta para obtener transacciones con filtros
  router.get('/filtradas', async (req, res) => {
    const usuarioId = req.query.usuarioId;
    const { fechaInicio, fechaFin, tipo } = req.query;
    console.log('Obteniendo transacciones filtradas para usuarioId:', usuarioId);

    try {
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

  // Ruta para realizar una transferencia
  router.post('/transferencia', async (req, res) => {
    const { cliente_id, tipo, monto, usuario_id } = req.body;
    console.log('Realizando transferencia para usuario_id:', usuario_id);

    // Asegúrate de verificar si el cliente existe antes de insertar
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

module.exports = createTransaccionesRouter;
